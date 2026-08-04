import assert from "node:assert/strict";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

test("renders development preview metadata", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("keeps the handout as fixed A4 sheets with the agreed Step 4 order", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("layout-test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  const html = await response.text();

  assert.equal((html.match(/class="[^"]*\bsheet\b/g) ?? []).length, 16);
  assert.doesNotMatch(html, /printBreak/);

  const pageIds = [...html.matchAll(/data-page=\"([^\"]+)\"/g)].map((match) => match[1]);
  assert.deepEqual(pageIds, ["cover", "p01", "p02", "p03", "p04", "p05", "p06", "p07", "p08", "p09", "p10", "p11", "p12", "p13", "p14", "p15"]);

  const page09 = html.indexOf('data-page="p09"');
  const page10 = html.indexOf('data-page="p10"');
  const page11 = html.indexOf('data-page="p11"');
  const page12 = html.indexOf('data-page="p12"');
  const scenario = html.indexOf("HTML 簡報生成後");
  const examplePrompt = html.indexOf("請在「光影奇航」簡報中插入一個互動頁面");
  const fiveCards = html.indexOf("互動規格只回答五題");
  const template = html.indexOf("請在簡報的第［頁次／主題］頁插入一個互動頁面");
  const specification = html.indexOf("我的單一互動：概念、動作、變化與回饋");
  const netlify = html.indexOf("完成互動規格並登入 Netlify");

  assert.ok(page09 < scenario && scenario < page10);
  assert.ok(page10 < examplePrompt && examplePrompt < fiveCards);
  assert.ok(fiveCards < template && template < specification && specification < page11);
  assert.ok(page11 < netlify && netlify < page12);
});
