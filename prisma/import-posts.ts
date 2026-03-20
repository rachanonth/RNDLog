/**
 * One-time import of all posts from the old rachanont.com site.
 * Run with: npx ts-node --compiler-options '{"module":"CommonJS"}' prisma/import-posts.ts
 */

import { PrismaClient } from "@prisma/client";
import { NodeHtmlMarkdown } from "node-html-markdown";

const prisma = new PrismaClient();

const nhm = new NodeHtmlMarkdown();

function html(raw: string): string {
  return nhm.translate(raw).trim();
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// All 17 posts scraped from rachanont.com/blog
const posts = [
  {
    title: "Smooth Code, Failed Deploy: My Astro Update Story with Cursor AI",
    slug: "smooth-code-failed-deploy-cursor-ai",
    publishedAt: new Date("2025-06-24"),
    excerpt: "อัปเดต Astro ด้วย Cursor AI สำเร็จบนเครื่อง แต่ deploy ล้มเหลวบน Vercel — สิ่งที่ Cursor ค้นพบทำให้ทุกอย่างผ่านในที่สุด",
    content: html(`<p>สวัสดีครับ! ได้เวลากลับมาปัดฝุ่นบล็อก rachanont.com ที่สร้างด้วย Astro กันอีกครั้ง เลยตั้งใจจะอัปเดตเวอร์ชันซะหน่อยครับ รอบนี้ขอไม่ทำแบบเดิมๆ แต่จะลองใช้ "Cursor AI" มาเป็นผู้ช่วยดู อยากรู้เหมือนกันว่าจะเจ๋งจริงสมคำร่ำลือไหม</p>
<p>ผมเปิดโปรเจกต์ขึ้นมาแล้วก็สั่ง Cursor ไปตรงๆ เลยว่า "migrate this astro blog to current version" เค้าก็แจ้งว่ามีอะไรต้องทำบ้าง แล้วให้เรายืนยันอีกทีว่าจะทำเลย มั้ย ก็จัดไปเลยสิ</p>
<p>พอกดรันคำสั่งไป ทุกอย่างก็ดูราบรื่นดีครับ ลองรันบนเครื่องตัวเองเว็บก็ขึ้นปกติไม่มีปัญหาอะไรเลย</p>
<p>ด้วยความมั่นใจ ผมก็ push โค้ดขึ้น GitHub ทันที แล้วก็นั่งรอ Vercel ที่เชื่อมต่อไว้ deploy อัตโนมัติ แต่รอแล้วรอเล่า... build failed จ้า! ตอนแรกก็งงเลย เพราะบนเครื่องเรารันได้ปกติแท้ๆ</p>
<p>ผมเลยย้อนกลับมาที่ Cursor อีกรอบ คราวนี้ผมก๊อบปี้ log ที่ล่มจาก Vercel มาแปะในช่องแชททั้งหมด ให้เค้าดู</p>
<p>นี่แหละครับคือจุดพีค! Cursor วิเคราะห์ log แล้วบอกผมทันทีว่า "ดูเหมือนเวอร์ชันของ Astro ที่คุณอัปเดตมา ต้องการ Node.js v20 นะ แต่โปรเจกต์บน Vercel ของคุณยังตั้งค่าให้ใช้ v18 อยู่"</p>
<p>ใช่เลย! ผมลืมไปสนิทว่าต้องไปแก้เวอร์ชันของ Node.js ในหน้าตั้งค่าของ Vercel ด้วย Cursor ไม่ใช่แค่บอกปัญหา แต่ยังบอกวิธีแก้ที่ตรงจุดสุดๆ คือให้ไปที่ Project Settings > General แล้วเปลี่ยน Node.js Version</p>
<p>พอผมเข้าไปแก้ตามที่มันบอกแล้วกด deploy ใหม่อีกครั้ง... ผ่านฉลุย! เว็บของผมกลับมาออนไลน์บน Astro เวอร์ชันล่าสุดได้สำเร็จ</p>
<p>สรุปคือ Cursor AI ช่วยให้การอัปเดตโค้ดบนเครื่องผมเร็วขึ้นจริงๆ ครับ แต่มันโชว์ความเทพสุดๆ ตอนช่วยดีบั๊กปัญหาการ deploy ที่มองข้ามไปนี่แหละ มันเหมือนมีเพื่อนเก่งๆ มาช่วยชี้จุดที่เราพลาดไปจริงๆ</p>`),
  },
  {
    title: "HUAWEI MatePad 11.5 PaperMatte",
    slug: "HUAWEIMatePadPaperMatte",
    publishedAt: new Date("2024-04-15"),
    excerpt: "รีวิว HUAWEI MatePad 11.5 PaperMatte — จอสะท้อนแสงน้อย ใช้งานได้ครบ แม้ไม่มี GMS",
    content: html(`<p>รุ่นที่ซื้อมาใช้เป็นรุ่นก่อนหน้านี้ ซึ่งความต่างคือ ROM 128 ส่วนตัวใหม่เพิ่มเป็น 256 แล้ว</p>
<p>สิ่งที่ชอบคือ</p>
<ul>
<li>จอสะท้อนแสงน้อยกว่าจอปกติ ใช้อ่านได้สบายตากว่า ipad</li>
<li>ลง app ที่ต้องใช้ได้หมด การที่ไม่มี GMS ไม่มีผลเท่าไหร่</li>
<li>เร็วกว่า e-ink reader ซึ่งแน่นอน แต่ก็แลกกับความสบายตาในการอ่านซึ่งสู้ไม่ได้</li>
</ul>
<p>ส่วนข้อเสีย</p>
<ul>
<li>แบตหมดไว แต่ถ้าไม่ได้ใช้งานหนักอะไร ก็ใช้ได้สองวัน</li>
<li>ใช้จอ 12.9" จนชิน พอมาใช้ 11.5" ทำให้รู้สึกว่าพื้นที่การจดลดลง ต้องปรับตัวหน่อย</li>
<li>อุปกรณ์เสริมน้อย ยังดีพอหาเคสกับฟิล์มจาก shopee ได้</li>
</ul>
<p>สรุปแล้วด้วยความที่ไม่มี GMS จึงขายยากกว่ายี่ห้ออื่น ทำให้มีโปรโมชันลดแลกแจกแถมเยอะมาก ถ้าใครไม่มีปัญหากับการลง app ซึ่งยากกว่า android ทั่วไปนิดหน่อย tablet ตัวนี้จะคุ้มค่ามาก</p>
<p>ปล. ผมใช้ app จดโน้ตเป็น NOTEIN แทน Notes ที่ติดมากับเครื่อง รู้สึกชอบ ui มากกว่า</p>`),
  },
  {
    title: "My Cell Phone Model History",
    slug: "mycellphonemodelhistory2023",
    publishedAt: new Date("2023-10-09"),
    excerpt: "ย้อนดูโทรศัพท์ทุกรุ่นที่ใช้มากว่า 16 ปี และเหตุผลที่กลับมาใช้ iPhone",
    content: html(`<p>ผ่านมากว่า 16 ปีแล้วกับโทรศัพท์รุ่นต่างๆ ที่ใช้มาตั้งแต่เริ่มทำงาน ซึ่งตอนนี้ก็กลับมาใช้ iPhone เป็นหลักแล้ว ซึ่งมีข้อดีคือ ราคาขายต่อไม่ตกมาก ทำให้พอคิดเป็นค่าเสื่อมต่อเดือนแล้วไม่ต่างกับการใช้ android ส่วนเรื่อง ecosystem ไม่ค่อยมีผลมากเหมือนช่วงแรกๆ แล้ว เพราะแอพที่ใช้บ่อยๆ ก็มีทั้งสองฝั่ง</p>
<p>แต่ที่ชอบ iPhone มากกว่า เพราะราคาขายต่อทำให้เปลี่ยนเครื่องทุก 2 - 3 ปีได้โดยไม่เกินงบที่กำหนดไว้ แล้วก็ประหยัดเวลา research เพราะมันมีให้เลือกเต็มที่ก็แค่ 4 รุ่น ส่วน Google Pixel ก็น่าใช้ แต่ไม่ค่อยได้ถ่ายรูปมาก เลยยังเฉยๆ ต้องรอดูปีหน้าว่าจะมีอัพเดตอะไรใหม่ๆ มาให้อยากเปลี่ยนเครื่องมั้ย</p>`),
  },
  {
    title: "How to add fonts to your Kindle",
    slug: "Howtoaddfontstokindle",
    publishedAt: new Date("2023-09-23"),
    excerpt: "วิธีเพิ่มฟอนต์ภาษาไทยเข้า Kindle Paperwhite ใน 6 ขั้นตอนง่ายๆ",
    content: html(`<p>ขุด Kindle Paperwhite มาใช้งานใหม่ แบตยังใช้งานได้ดีอยู่ แต่คราวนี้จะเอามาอ่าน EPUB ภาษาไทย เลยต้องเพิ่มฟอนต์หน่อย วิธีการก็ไม่ยาก ตามนี้เลย</p>
<ol>
  <li><strong>ดาวน์โหลดฟอนท์ที่ต้องการ</strong> ซึ่งส่วนใหญ่ผมดาวน์โหลดจากเว็บ <a href="https://www.f0nt.com/">F0nt</a> นี่แหละ</li>
  <li><strong>ต่อ Kindle Paperwhite กับคอมพิวเตอร์</strong> ผ่านสาย data หรือสายชาร์จนี่แหละ</li>
  <li><strong>สร้างโฟลเดอร์ "fonts"</strong> แต่ถ้ามีโฟลเดอร์นี้แล้วก็ไปขั้นต่อไปได้เลย</li>
  <li><strong>Copy ฟอนท์มาใส่โฟลเดอร์ "fonts" บน Kindle Paperwhite</strong></li>
  <li><strong>ถอดสาย data ออก</strong></li>
  <li><strong>รีสตาร์ท Kindle Paperwhite</strong> โดยกดปุ่ม power ค้างประมาณ 40 วินาที</li>
</ol>
<p>พอรีสตาร์ทเสร็จ เราก็จะมีฟอนท์ให้เลือกเพิ่มแล้ว</p>
<p><strong>ข้อแนะนำเพิ่มเติม</strong></p>
<ul>
  <li>ฟอนท์บางตัวอาจใช้ไม่ได้ เพราะ Kindle ไม่รองรับ</li>
  <li>อย่าใส่ฟอนท์เยอะเกินไป เพราะจะทำให้เครื่องช้าลง ควรเลือกเฉพาะที่ต้องการใช้งาน</li>
  <li>เลือกใช้ฟอนท์นามสกุล TTF จะไม่ค่อยมีปัญหา</li>
</ul>`),
  },
  {
    title: "เศรษฐศาสตร์ความจน (Poor Economics)",
    slug: "pooreconomicbook",
    publishedAt: new Date("2023-09-20"),
    excerpt: "สรุปโน้ตหนังสือ Poor Economics — ความจนเกิดจากอะไร และแก้ได้อย่างไร",
    content: html(`<p>จัดลิ้นชักแล้วเจอโน้ตหนังสือ <a href="https://salt.co.th/product/poor-econs/">เศรษฐศาสตร์ความจน (Poor Economics)</a> เลยเอามาบล็อกเก็บไว้</p>
<p>ปัญหาความยากจนนั้นเกิดจากปัจจัยหลายประการ ทั้งปัจจัยส่วนบุคคล ปัจจัยทางเศรษฐกิจ และปัจจัยสังคม โดยปัจจัยส่วนบุคคล ได้แก่ การศึกษา ทักษะ และทัศนคติของคนจน ปัจจัยทางเศรษฐกิจ ได้แก่ รายได้ หนี้สิน และโอกาสทางธุรกิจ ปัจจัยสังคม ได้แก่ โครงสร้างทางเศรษฐกิจ นโยบายของรัฐบาล และอคติของคนในสังคม</p>
<p>ข้อมูลบางส่วนที่สรุปได้ มีดังนี้</p>
<ul>
<li>คนจนมีปัญหาเรื่องเก็บออมเพราะเมื่อมีเงินจะหมดไปกับสิ่งของยั่วใจเช่น ขนม เหล้า บุหรี่ ของใช้ไม่จำเป็น</li>
<li>การฝันว่าจะมีทีวีดูก็เป็นความหวังอย่างหนึ่งที่ช่วยให้เก็บออมเงินได้</li>
<li>การจะช่วยคนจนคือ การทำให้เขาได้เข้าใกล้เป้าหมายง่ายขึ้นเพื่อที่จะเริ่มมีเป้าหมายแบบคนรวยได้บ้าง</li>
<li>สินเชื่อทำให้คนจนมีธุรกิจที่เพิ่มรายได้ประมาณ 10% แต่ไม่ทำให้หลุดพ้นจากความจน</li>
<li>คนจนทำธุรกิจเพราะหาอาชีพทั่วไปทำไม่ได้</li>
<li>การมีงานที่มั่นคงเปลี่ยนทัศนคติที่คนมีต่อชีวิตได้อย่างสิ้นเชิง</li>
<li>คนจนมักขาดข้อมูลสำคัญและเชื่อสิ่งผิดๆจึงตัดสินใจผิดพลาด จึงควรให้ข้อมูลโดยพูดถึงสิ่งที่คนยังไม่รู้ โดยใช้วิธีที่น่าดึงดูดใจและเรียบง่ายทั้งต้องมาจากแหล่งที่น่าเชื่อถือ</li>
<li>คนจนรับผิดชอบมิติต่างๆ ของชีวิตตนเองมากเกินไป ยิ่งรวยเท่าไหร่ ภาระตรงนี้ยิ่งลดลงเพราะมีคนตัดสินใจสิ่งที่ถูกต้องให้</li>
<li>มีเหตุให้เชื่อว่าตลาดบางตลาดสำหรับคนจนยังขาดหายไป หรือคนจนต้องจ่ายราคาแพงเกินเหตุ</li>
<li>ประเทศยากจนไม่ได้ถูกกำหนดว่าจะต้องล้มเหลวเพราะยากจน หรือเพราะผ่านประวัติศาสตร์ที่เลวร้าย แต่มาจากปัญหา 3 อ. อวิชา อุดมการณ์ และความเอื่อยเฉื่อย</li>
<li>ปรากฏการณ์ความคาดหวังสร้างความจริงโดยคาดหวังว่านักการเมืองเห็นแก่ตัวเขาจะเห็นแก่ตัวน้อยลง</li>
<li>กับดักความจนอาจไม่มีอยู่จริง</li>
<li>การสนับสนุนเงินอาจเป็นโทษ</li>
</ul>
<p>จากข้อมูลเหล่านี้ แนวทางการแก้ไขปัญหาความยากจน อาจทำได้โดย</p>
<ul>
<li>การให้ความรู้และทักษะที่จำเป็นกับคนจน เพื่อให้สามารถพัฒนาตนเองและหารายได้ที่มั่นคงได้</li>
<li>การสร้างโอกาสทางธุรกิจและการสนับสนุนคนจนในการประกอบอาชีพ</li>
<li>การปรับปรุงโครงสร้างทางเศรษฐกิจและนโยบายของรัฐบาล เพื่อให้เอื้อต่อการลดความเหลื่อมล้ำและยกระดับคุณภาพชีวิตของคนจน</li>
<li>การลดอคติของคนในสังคมต่อคนจน</li>
</ul>
<p>นอกจากนี้ สิ่งสำคัญคือต้องเข้าใจสาเหตุของความยากจนอย่างถ่องแท้ เพื่อให้สามารถกำหนดแนวทางการแก้ไขปัญหาได้อย่างมีประสิทธิภาพ</p>`),
  },
  {
    title: "Emojilist",
    slug: "emojilist",
    publishedAt: new Date("2023-09-15"),
    excerpt: "สร้าง React component รวม emoji พร้อมปุ่ม copy ใช้เองบน GoodNotes",
    content: html(`<p>ด้วยความที่อยากได้อะไรมาเน้นโน้ตกับแต่งโน้ตเล็กน้อยบน goodnote ซึ่งก็หนีไม่พ้นการใช้ emoji มาแต่ง แต่ด้วยความที่ emoji keyboard ไม่ตอบโจทย์ตัวเอง กับการเปิดจากเว็บรวม emoji หน้าเว็บก็โหลดเยอะมาก โฆษณาเต็มไปหมด ก็เลยทำหน้ารวม emoji ไว้ใช้เอง พร้อมปุ่ม copy</p>
<p>โดยผมเขียนเป็น component บน react ส่วนหน้าตาก็ไม่ต้องแต่งอะไร เน้นใช้งาน เวลาใช้ก็เปิดเป็น slide over บน goodnote จากนั้นก็ copy paste ได้เลย ประหยัดเวลาไปเยอะ ส่วน code ก็ตามนี้ครับ</p>
<pre><code>import React, { useState } from 'react';

const EmojiList = () => {
  const emojis = [
    '❶ ', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '⓿', '🏛️', '🚧', '⚠️', '⛔', '📕', '🌟', '✔️', '✅', '❌', '🎖️', '🔖', '📌', '📆',
  ];
  const [copiedEmoji, setCopiedEmoji] = useState('');

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
  };

  const midpoint = Math.ceil(emojis.length / 2);

  return (
    &lt;div&gt;
      &lt;h1&gt;Emoji List&lt;/h1&gt;
      ...
    &lt;/div&gt;
  );
};

export default EmojiList;</code></pre>`),
  },
  {
    title: "Slowing the progression of renal function decline",
    slug: "Slowing-the-progression-of-renal-function-decline",
    publishedAt: new Date("2023-09-11"),
    excerpt: "บทบาทเภสัชกรในการชะลอการเสื่อมของไต — 12 ประเด็นหลักที่ต้องดูแลและจัดการ",
    content: html(`<p>การชะลอไตของผู้ป่วยให้เสื่อมช้าลง เป็นอีกบทบาทหนึ่งของเภสัชกรในฐานะทีมดูแลผู้ป่วยโรคเรื้อรัง โดยประเด็นหลักที่ต้องดูแลและจัดการมีตามนี้</p>
<ol>
<li><strong>Blood Pressure Management:</strong> ความดันโลหิตสูงจะทำให้เกิดการเสียหายของไต เราจึงต้องจำเป็นช่วยให้ผู้ป่วยควบคุมความดันโลหิตให้ได้ ด้วยการให้ได้รับยาที่จำเป็น และปรับเปลี่ยนการใช้ชีวิต</li>
<li><strong>Diabetes Control:</strong> โรคเบาหวานที่ควบคุมระดับน้ำตาลไม่ได้ ก็เป็นอีกปัจจัยที่เร่งการเสื่อมของไต นอกจากปรับเปลี่ยนการใช้ชีวิตอย่างอาหารการกินแล้ว ต้องดูแลการใช้ยาอย่างเข้มงวดให้เป็นไปตามแผนการรักษาด้วย</li>
<li><strong>Medication Review:</strong> เภสัชกรจำเป็นต้องทวนรายการยาที่ผู้ป่วยใช้อยู่เสมอ เพื่อเฝ้าระวัง ไม่ให้เกิดการใช้ยาบางตัวที่มีผลกระทบต่อไต โดยการปรับขนาดการใช้ยาให้เหมาะสมกับการทำงานของไต หรือแจ้งแพทย์ให้หยุดยาพร้อมทั้งเสนอยาหรือหารรักษาทางเลือก</li>
<li><strong>Monitor Protein Intake:</strong> การรับประทานโปรตีนมากเกินไป จะทำให้ไตทำงานหนัก ควรแนะนำให้ผู้ป่วยควบคุมอาหาร หรือพบโภชนากรเพื่อปรับเปลี่ยนและวางแผนมื้ออาหาร</li>
<li><strong>Salt Restriction:</strong> การจำกัดการบริโภคเกลือช่วยลดทั้งความดันโลหิต และลดผลกระทบต่อไต จึงควรแนะนำให้ผู้ป่วยหลีกเลี่ยงการรับประททานอาหารที่มีโซเดียมสูง</li>
<li><strong>Hydration:</strong> การดื่มน้ำอย่างเพียงพอเป็นปัจจัยสำคัญในการดูแลการทำงานของไต จึงจำเป็นต้องเน้นย้ำให้ผู้ป่วยดื่มน้ำอย่างสม่ำเสมอตลอดวัน ประมาณ 2 - 3 ลิตรต่อวัน</li>
<li><strong>Quit Smoking:</strong> บุหรี่ทำร้ายไตอย่างมาก การสนับสนุนให้ผู้ป่วยเลิกบุหรี่เป็นอีกเรื่องที่สำคัญลำดับต้นๆ</li>
<li><strong>Regular Monitoring:</strong> ติดตามการทำงานของไตเป็นระยะผ่านการตรวจเลือดเพื่อหาค่าการทำงานของไต (eGFR) และตรวจปัสสาวะเพื่อดูการรั่วของโปรตีน</li>
<li><strong>Medication Adherence:</strong> ดูแลให้ผู้ป่วยใช้ยาอย่างสม่ำเสมอตามแพทย์สั่ง เพราะการลืมรับประทานยาบ่อยๆ ส่งผลต่อการควบคุมโรคเบาหวาน และความดันโลหิตสูง</li>
<li><strong>Lifestyle Modification:</strong> แนะนำให้ปรับเปลี่ยนการใช้ชีวิต ตั้งแต่การออกกำลังกายอย่างสม่ำเสมอ ควบคุมน้ำหนัก และบริหารความเครียด</li>
<li><strong>Patient Education:</strong> สรุปข้อแนะนำทุกข้อ ให้เข้าใจง่าย เป็นขั้นๆ ตั้งแต่ สาเหตุ ปัจจัยความเสี่ยง จนไปถึงการจัดการ</li>
<li><strong>Collaboration:</strong> ร่วมมือกับทีมโดยให้ข้อมูลเรื่องการใช้ยา และ drug interactions ที่อาจเกิดได้</li>
</ol>
<p>การชะลอไตให้เสื่อมช้าลง ต้องอาศัยการดูแลเป็นทีม และเน้นไปที่การให้ความรู้และเสริมพลังให้ผู้ป่วยมีความเชื่อมั่นในการดูแลและจัดการตนเองตามแผนของทีม</p>`),
  },
  {
    title: "Dose adjustment in renal impairment",
    slug: "dose-adjustment-in-renal-impairment",
    publishedAt: new Date("2023-09-11"),
    excerpt: "Ensuring safe medication use in patients with kidney disease requires understanding GFR, drug pharmacokinetics, and careful dose adjustment.",
    content: html(`<h2>Navigating Medication Safety: Dose Adjustment in Renal Impairment</h2>
<p>As healthcare professionals, ensuring the safe and effective use of medications is at the core of our practice. One crucial aspect that often requires our attention is dose adjustment in patients with renal impairment. The kidneys play a pivotal role in filtering and excreting drugs from the body, making their proper function essential for medication clearance. However, when renal function is compromised, as in the case of renal impairment, dose adjustments become imperative to prevent adverse effects and ensure therapeutic efficacy.</p>
<h3>Understanding Renal Impairment:</h3>
<p>Renal impairment can result from various medical conditions, such as chronic kidney disease or acute kidney injury. These conditions can reduce the kidney's ability to clear drugs efficiently, leading to potential drug accumulation in the body. Therefore, a one-size-fits-all approach to medication dosing is no longer suitable for such patients.</p>
<h3>Factors Influencing Dose Adjustment:</h3>
<ol>
<li><strong>Glomerular Filtration Rate (GFR):</strong> The GFR is a key indicator of renal function. A lower GFR signifies decreased kidney function and requires dose modification for drugs primarily excreted through the kidneys.</li>
<li><strong>Drug Characteristics:</strong> Understanding a medication's pharmacokinetics is vital. Drugs that are renally cleared and have a narrow therapeutic window often necessitate dose reduction.</li>
<li><strong>Drug Interactions:</strong> Some drugs can interact with each other, leading to increased or decreased levels in the bloodstream. Renal-impaired patients may be more susceptible to these interactions.</li>
<li><strong>Patient-Specific Factors:</strong> Age, weight, comorbidities, and genetic variations can influence how individuals metabolize and excrete drugs.</li>
</ol>
<h3>Importance of Collaboration:</h3>
<p>Collaboration among healthcare professionals, including pharmacists, physicians, and nurses, is essential when managing patients with renal impairment. Pharmacists, in particular, play a crucial role in assessing medication regimens, recommending dose adjustments, and monitoring for adverse effects.</p>
<p>In conclusion, dose adjustment in renal impairment is a critical aspect of medication management. It requires a comprehensive understanding of the patient's renal function, the pharmacokinetics of the drug, and careful consideration of individual patient factors. By working together and staying informed, we can ensure that patients with renal impairment receive safe and effective medication therapy.</p>`),
  },
  {
    title: "Getting Started with Astro",
    slug: "blogwithastro",
    publishedAt: new Date("2023-09-10"),
    excerpt: "ทดลองใช้ Astro สร้างบล็อกหลังจากลอง Gatsby, Jekyll และ Medium — เร็วมาก deploy ผ่าน Vercel",
    content: `ทดลองใช้ Astro สร้างบล็อกหลังจากลอง Gatsby, Jekyll และ Medium มาสักพัก

## ทำไมถึงเลือก Astro

ก่อนหน้านี้ใช้ Medium อยู่เกือบปีแต่รู้สึกว่าช้าและไม่ค่อยถูกใจ เคยลอง Gatsby กับ Jekyll แล้วก็ยังไม่ได้เรื่อง จนมาเจอ Astro จากโพสต์ใน Facebook รู้สึกว่าเร็วมาก หน้าเว็บโหลดแทบจะ instant เลย

## ขั้นตอนการตั้งค่า

- Fork ตัวอย่างบล็อกจาก GitHub
- ใช้ Gitpod workspace เปิดโปรเจกต์
- เลือก Bubblegum theme และปรับ component ต่างๆ
- จัดเรียง content เป็นไฟล์ Markdown
- Deploy ผ่าน Vercel

## Workflow การเขียน

เขียนด้วย Typora แล้ว commit ขึ้น GitHub Vercel ก็ build และ deploy ให้อัตโนมัติ สะดวกมาก`,
  },
  {
    title: "ตัวอย่างผลิตภัณฑ์อาหารทางการแพทย์สูตรครบถ้วนสำหรับผู้ใหญ่",
    slug: "medicalfoods",
    publishedAt: new Date("2023-09-10"),
    excerpt: "ตารางเปรียบเทียบผลิตภัณฑ์อาหารทางการแพทย์สูตรครบถ้วนสำหรับผู้ใหญ่",
    content: `ตาราง ตัวอย่างผลิตภัณฑ์อาหารทางการแพทย์สูตรครบถ้วนสำหรับผู้ใหญ่

**ที่มา** — [บทความการศึกษาต่อเนื่องทางเภสัชศาสตร์เรื่อง อาหารทางการแพทย์ (Medical Foods)](https://ccpe.pharmacycouncil.org/index.php?option=article_detail&subpage=article_detail&id=1405)`,
  },
  {
    title: "My pharmacist thailand app tutorial",
    slug: "my-pharmacist-thailand-app",
    publishedAt: new Date("2023-08-09"),
    excerpt: "ขั้นตอนการลงทะเบียนใช้งานระบบเช็คอิน My Pharmacist",
    content: `ขั้นตอนการลงทะเบียนใช้งานระบบเช็คอิน My Pharmacist

*เนื้อหาอยู่ระหว่างการอัปเดต*`,
  },
  {
    title: "7 habits of super organised people",
    slug: "7habits",
    publishedAt: new Date("2022-11-22"),
    excerpt: "7 นิสัยของคนที่มีระเบียบสูง — จากการปกป้องเวลาไปจนถึงการจัดการอีเมล",
    content: `7 นิสัยที่ทำให้คนมีระเบียบในชีวิต

1. **Protect Your Time Fiercely** — ปกป้องเวลาของคุณอย่างเด็ดขาด รู้จักปฏิเสธสิ่งที่ไม่จำเป็น
2. **Have a Place For Everything — and Put it There** — ทุกสิ่งมีที่ของมัน และต้องวางไว้ในที่นั้นเสมอ
3. **Make Time for High-Value Priorities** — จัดสรรเวลาให้กับงานที่มีคุณค่าสูงเสมอ
4. **Purge Your Schedule to Build Efficient Routines** — ตัดสิ่งที่ไม่จำเป็นออกจากตารางเวลาเพื่อสร้าง routine ที่มีประสิทธิภาพ
5. **Have a Routine — Even On Nights and Weekends** — มี routine แม้ในช่วงคืนและวันหยุดสุดสัปดาห์
6. **Configure Your Phone to Work For You, Not Against You** — ตั้งค่าโทรศัพท์ให้ทำงานเพื่อคุณ ไม่ใช่ต่อต้านคุณ
7. **Treat Emails Like Appointments** — จัดการอีเมลเหมือนการนัดหมาย กำหนดเวลาเปิดอ่านและตอบกลับ`,
  },
  {
    title: "แนวทางการศึกษาคณะนิติศาสตร์ในระดับปริญญาตรี",
    slug: "lawstudyguide",
    publishedAt: new Date("2022-10-17"),
    excerpt: "แนวทางการศึกษากฎหมายที่ปรับจากคำแนะนำของผู้ที่สอบเนติบัณฑิตและอัยการผู้ช่วยสำเร็จ",
    content: html(`<p>แนวทางที่ผมใช้หยิบมาจากคำแนะนำของหลายๆ ท่านที่ใช้ในการศึกษาในระดับปริญญาตรี เนติบัณฑิต และการเตรียมสอบอัยการผู้ช่วย, ผู้ช่วยผู้พิพากษา โดยนำมาปรับเปลี่ยนให้เข้ากับลักษณะนิสัยของตัวเอง และผลลัพธ์ที่ได้หลังจากการนำไปใช้ในแต่ละครั้ง จึงแนะนำให้ทุกท่านที่เข้ามาอ่านเลือกใช้ ทดลองทำตาม และปรับเปลี่ยนให้เข้ากับตัวเองครับ</p>
<h2>แนวทาง</h2>
<ul>
<li>รอบแรกอ่านเฉพาะแนวคิดและวัตถุประสงค์ทั้งหมดให้เห็นภาพรวมของแต่ละวิชา</li>
<li>รอบสองอ่านเอกสารการสอนทั้งหมดโดยเขียนตอบกิจกรรมท้ายตอนทุกตอน</li>
<li>อ่านหนังสือสรุปของสาขาวิชาเช่น หนังสือ อาญา 1 แพ่ง 1 กฎหมายว่าด้วยทรัพย์สิน</li>
<li>ทำข้อสอบในวารสารกฎหมายฉบับพิเศษบ่อยๆ จนเขียนคำตอบได้เหมือนหรือใกล้เคียงเฉลย</li>
<li>นำคำแนะนำของอาจารย์ในส่วนของวิเคราะห์ข้อสอบมาปฏิบัติตาม</li>
<li>ท่องตัวบทเฉพาะที่อยู่ในตัวอย่างในวารสารกฎหมายฉบับพิเศษทั้งสองเล่มให้ได้ก่อนครับ</li>
<li>และดีที่สุดควรท่องตัวบททั้งหมดในแต่ละวิชา โดยจำเป็นคำสำคัญ</li>
<li>หัดทำข้อสอบเก่า</li>
</ul>
<h2>แนะนำอ่านเพิ่มเติม</h2>
<ul>
<li>หนังสือ 4 ขั้นตอนสู่การเรียนกฎหมายให้สำเร็จ</li>
<li>วิธีคลายเครียดจากการอ่านหนังสือ</li>
<li>เอกสารวิธีการเรียนด้วยตนเอง (ระบบการศึกษาทางไกล)</li>
<li>หลักการตอบข้อสอบ กม.วิธีพิจารณาความอาญา 1</li>
<li>บทความ #เทคนิคจำตัวบท</li>
</ul>`),
  },
  {
    title: "Bullet Journal® Reference Guide (Thai translation)",
    slug: "bulletjournalth",
    publishedAt: new Date("2022-10-10"),
    excerpt: "คู่มือ Bullet Journal ฉบับภาษาไทย — ดาวน์โหลดได้เลย",
    content: `คู่มืออ้างอิง Bullet Journal® ฉบับแปลภาษาไทย

[ดาวน์โหลดคู่มือ (PDF)](https://www.dropbox.com/s/xlglmwhsuzkfhjy/Thai%20Bullet%20Journal%C2%AE%20Reference%20Guide.pdf?dl=0)`,
  },
  {
    title: "การเก็บคดีสำหรับสอบผู้พิพากษา / อัยการ",
    slug: "collectlawcase",
    publishedAt: new Date("2021-05-15"),
    excerpt: "ขั้นตอนและการเตรียมตัวเก็บคดีที่ศาลสำหรับผู้ที่ไม่ได้เป็นทนายความประจำ",
    content: html(`<p>สำหรับผู้ที่ไม่ได้ทำงานประจำเป็นทนายความ จำเป็นต้องไปรบกวนพี่ๆ น้องๆทนายความขอเก็บคดี การเตรียมตัวให้ดีก่อนไปจึงเป็นสิ่งที่ต้องทำ</p>
<h2>1. เตรียมเอกสารต่อไปนี้</h2>
<ul>
<li>ใบแต่งทนายความ</li>
<li>สำเนาใบอนุญาตให้เป็นทนายความ พร้อมเซ็นรับรองสำเนาถูกต้อง</li>
<li>ใบเก็บคดี สำหรับการสอบผู้ช่วยผู้พิพากษา</li>
<li>ใบเก็บคดี สำหรับการสอบอัยการผู้ช่วย</li>
</ul>
<h2>2. ขั้นตอนการเก็บคดี</h2>
<ol>
<li>ไปยังศาลที่เสะดวกเดินทาง (ศาลแขวงหรือศาลจังหวัด) ก่อน 8.00 น.</li>
<li>หาบอร์ดนัดความเพื่อติดตามห้องพิจารณาในคดีตั้งผู้จัดการมรดกหรือคดีผู้บริโภค</li>
<li>หาพี่ทนายความ แจ้งเจ้าหน้าที่หน้าบังลังก์ว่ามาขอเก็บคดี</li>
<li>ขอใบเบิกความและเก็บข้อมูล จากนั้นขอตัวความลงลายมือชื่อ</li>
<li>ยื่นเอกสารทั้งหมดให้เจ้าหน้าที่หน้าบังลังก์</li>
</ol>
<h2>3. ระหว่างการพิจารณาคดี</h2>
<ul>
<li>เตรียมการเบิกความกับพยาน ช่วยทนายความในงานต่างๆ</li>
<li>ใส่ชุดครุยก่อนผู้พิพากษาขึ้นนั่งบังลังก์</li>
<li>นำพยานสาบานตน รอผู้พิพากษาถาม จากนั้นถามพยานต่อ</li>
<li>ลงลายมือชื่อที่เอกสารหลังเสร็จการพิจารณา</li>
<li>รอ 1-2 วัน แล้วตรวจสอบระบบติดตามสำนวนคดีเพื่อได้เลขคดีแดง</li>
</ul>`),
  },
  {
    title: "Building A Second Brain with Notion",
    slug: "Building-A-Second-Brain-with-Notion",
    publishedAt: new Date("2020-10-10"),
    excerpt: "สรุปแนวคิด Building A Second Brain ของ Tiago Forte และวิธีประยุกต์ใช้กับ Notion",
    content: `แนวคิด Building A Second Brain ของ Tiago Forte และการนำมาใช้กับ Notion

วิดีโอจาก DataRockie ที่สรุปแนวคิดจากหนังสือ *Building A Second Brain* ของ Tiago Forte และสาธิตการสร้างระบบ second brain ด้วย Notion โดยใช้รูปแบบ database ต่างๆ

*เนื้อหาอยู่ระหว่างการอัปเดต*`,
  },
  {
    title: "SOAP NOTE มันคือสบู่เหรอ",
    slug: "soapnote",
    publishedAt: new Date("2005-06-26"),
    excerpt: "บันทึกวันทำ SOAP note ผู้ป่วยปอดบวมที่มีภาวะไตเสื่อม — ค้นหาการปรับขนาดยา amikacin ยังไง",
    content: `วันที่ยากของการฝึกงานทางคลินิก — ทำ SOAP note สำหรับผู้ป่วยปอดบวมที่มีภาวะไตเสื่อมร่วมด้วย

ปัญหาที่เจอคือหาการปรับขนาดยา amikacin สำหรับผู้ป่วยไตเสื่อมในตำราที่มีไม่ได้ ต้องไปค้น Clinical Pharmacokinetic text และใช้ Brown nomogram

งานทั้งวันทำได้แค่ 3 ปัญหา SOAP เสร็จได้ตอนเที่ยง ยังเหลือ Hospital Course กับ Discharge Counseling ที่ต้องทำต่อวันอาทิตย์

**หมายเหตุ:** ตำรา Sanford ปี 2010 ได้เพิ่มตารางการปรับขนาดยาสำหรับผู้ป่วยไตเสื่อมแล้ว ซึ่งตอนนั้นยังไม่มี`,
  },
];

async function main() {
  console.log(`Importing ${posts.length} posts…\n`);

  // Remove the hello-world seed post first if it exists
  await prisma.post.deleteMany({ where: { slug: "hello-world" } });

  for (const post of posts) {
    const result = await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt,
        published: true,
      },
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt,
        published: true,
      },
    });
    console.log(`✓ ${result.publishedAt.toISOString().slice(0, 10)}  ${result.title}`);
  }

  console.log("\n✅ Import complete");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
