import { v2 as cloudinary } from 'cloudinary';
// 1. إعدادات حسابك (dj86zkbtp)
cloudinary.config({ 
  cloud_name: 'dj86zkbtp', 
  api_key: '995468747587363', 
  api_secret: 'n_87rvgI3rsBtrCHOMCdrqZcdH0' 
});

const urls = [
"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
"https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
"https://images.unsplash.com/photo-1552832230-c0197dd311b5`, ",
"https://images.unsplash.com/photo-1537996194471-e657df975ab4",
"https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9",
"https://images.unsplash.com/photo-1583422409516-2895a77efded",
"https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
"https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
"https://images.unsplash.com/photo-1597212618440-806262de4f6b",
"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
"https://images.unsplash.com/photo-1508009603885-50cf7c579365",
"https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
"https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
"https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
"https://images.unsplash.com/photo-1504829857797-ddff29c27927",
"https://images.unsplash.com/photo-1587595431973-160d0d163571",
"https://images.unsplash.com/photo-1541849546-216549ae216d`, ",
"https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
"https://images.unsplash.com/photo-1611348524140-53c9a25263d6",
"https://images.unsplash.com/photo-1589909202802-8f4aadce1849",
"https://images.unsplash.com/photo-1579606032821-4e6161c81571",
"https://images.unsplash.com/photo-1500759285222-a95626b934cb",
"https://images.unsplash.com/photo-1585208798174-6cedd86e019a",
"https://images.unsplash.com/photo-1534274988757-a28bf1a57c17",
"https://images.unsplash.com/photo-1548550023-2bdb3c5beed7`, ",
"https://images.unsplash.com/photo-1516550893923-42d28e5677af",
"https://images.unsplash.com/photo-1589871973318-9ca1258faa5d",
"https://images.unsplash.com/photo-1555990793-da11153b2473`, ",
"https://images.unsplash.com/photo-1589394815804-964ed0be2eb5",
"https://images.unsplash.com/photo-1559511260-66a68e7e7e40`, ",
"https://images.unsplash.com/photo-1526392060635-9d6019884377",
"https://images.unsplash.com/photo-1583417319070-4a69db38a482",
"https://images.unsplash.com/photo-1534113414509-0eec2bfb493f",
"https://images.unsplash.com/photo-1477587458883-47145ed94245",
"https://images.unsplash.com/photo-1583531352515-8884af319dc9",
"https://images.unsplash.com/photo-1595152772835-219674b2a8a6",
"https://images.unsplash.com/photo-1513635269975-59663e0ac1ad",
"https://images.unsplash.com/photo-1536599018102-9f6e6e5e8b40",
"https://images.unsplash.com/photo-1531761535209-180857e963b9",
"https://images.unsplash.com/photo-1509099927031-2775d569b3e5",
"https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
"https://images.unsplash.com/photo-1599413987323-b2b8b2f30f78",
"https://images.unsplash.com/photo-1512632578888-169bbab5e673",
"https://images.unsplash.com/photo-1558799401-1dcba79834c2`, ",
"https://images.unsplash.com/photo-1560969184-10fe8719e047`, ",
"https://images.unsplash.com/photo-1590559899731-a382839e5549",
"https://images.unsplash.com/photo-1518259102261-b40117eabbc0",
"https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
"https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
"https://images.unsplash.com/photo-1431274172761-fca41d930114",
"https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94",
"https://images.unsplash.com/photo-1503899036084-c55cdd92da26",
"https://images.unsplash.com/photo-1540959733332-eab4deabeeaf",
"https://images.unsplash.com/photo-1536098561742-ca998e48cbcc",
"https://images.unsplash.com/photo-1549693578-d683be217e58",
"https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
"https://images.unsplash.com/photo-1573843981267-be1999ff37cd",
"https://images.unsplash.com/photo-1540202404-a2f29016b523",
"https://images.unsplash.com/photo-1544550581-5f7ceaf7f992",
"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
"https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e",
"https://images.unsplash.com/photo-1560703650-ef3e0f254ae0",
"https://images.unsplash.com/photo-1604999565976-8913ad2ddb7c",
"https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
"https://images.unsplash.com/photo-1518684079-3c830dcef090",
"https://images.unsplash.com/photo-1580674684081-7617fbf3d745",
"https://images.unsplash.com/photo-1597659840241-37e2b4c2f990",
"https://images.unsplash.com/photo-1537996194471-e657df975ab4",
"https://images.unsplash.com/photo-1555400038-63f5ba517a47",
"https://images.unsplash.com/photo-1573790387438-4da905039392",
"https://images.unsplash.com/photo-1544644181-1484b3fdfc62",
"https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9",
"https://images.unsplash.com/photo-1534430480872-3498386e7856",
"https://images.unsplash.com/photo-1522083165195-3424ed129620",
"https://images.unsplash.com/photo-1485871981521-5b1fd3805eee",
"https://images.unsplash.com/photo-1516426122078-c23e76319801",
"https://images.unsplash.com/photo-1535083783855-76ae62b2914e",
"https://images.unsplash.com/photo-1547471080-7cc2caa01a7e",
"https://images.unsplash.com/photo-1518709594023-6eab9bab7b23",
"https://images.unsplash.com/photo-1587595431973-160d0d163571",
"https://images.unsplash.com/photo-1526392060635-9d6019884377",
"https://images.unsplash.com/photo-1580619305218-8423a7ef79b4",
"https://images.unsplash.com/photo-1594398901394-4e34551d698c",
"https://images.unsplash.com/photo-1504829857797-ddff29c27927",
"https://images.unsplash.com/photo-1520769669658-f07657f5a307",
"https://images.unsplash.com/photo-1476610182048-b716b8518aae",
"https://images.unsplash.com/photo-1531168556467-80aace0d0144",
"https://images.unsplash.com/photo-1583422409516-2895a77efded",
"https://images.unsplash.com/photo-1562883676-8c7feb83f09b",
"https://images.unsplash.com/photo-1564221710304-0b37c8b4a5c6",
"https://images.unsplash.com/photo-1523531294919-4bcd7c65e216",
"https://images.unsplash.com/photo-1531366936337-7c912a4589a7",
"https://images.unsplash.com/photo-1527668752968-14dc70a27c95",
"https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
"https://images.unsplash.com/photo-1491555103944-7c647fd857e6",
"https://images.unsplash.com/photo-1580060839134-75a5edca2e99",
"https://images.unsplash.com/photo-1516026672322-bc52d61a55d5",
"https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e",
"https://images.unsplash.com/photo-1591210659640-e498b05e0a77",
"https://images.unsplash.com/photo-1524231757912-21f4fe3a7200",
"https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b",
"https://images.unsplash.com/photo-1558383331-f520f2888351",
"https://images.unsplash.com/photo-1527866959252-deab85ef7d1b",
"https://images.unsplash.com/photo-1483729558449-99ef09a8c325",
"https://images.unsplash.com/photo-1544989164-31dc3291c737",
"https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f",
"https://images.unsplash.com/photo-1564659907532-6b5f98c8e68f",
"https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
"https://images.unsplash.com/photo-1508964942454-1461b402a69c",
"https://images.unsplash.com/photo-1496939376851-89342e90adcd",
"https://images.unsplash.com/photo-1565967511849-76a60a516170",
  // ... ضيف باقي الروابط الـ 55 هنا
];

async function runUpload() {
  console.log("🚀 جاري رفع الـ 55 صورة لـ Cloudinary...");
  for (let i = 0; i < urls.length; i++) {
    try {
      const publicId = `img_${i + 1}`; // تسمية الصور img_1, img_2...
      await cloudinary.uploader.upload(urls[i], {
        public_id: publicId,
        folder: 'sonny_travel_assets',
        overwrite: true,
        transformation: [
          { width: 800, height: 600, crop: "fill", quality: "auto", fetch_format: "auto" }
        ]
      });
      console.log(`✅ تم رفع ${publicId}`);
    } catch (err) {
      console.error(`❌ خطأ في صورة ${i}:`, err.message);
    }
  }
  console.log("🎉 مبروك! كل الصور ارفعت ومقاساتها اتظبطت.");
}

runUpload();