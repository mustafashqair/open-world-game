# Rebuilt split models (tab/v50g3) - measured

Measured 2026-11-07: all 206 parts listed in the GitHub API tree (`git/trees/tab/v50g3?recursive=1`, not truncated) downloaded from raw.githubusercontent.com (branch tab/v50g3), each part size matched the tree, then joined with tools/join_large_files.py. sha256 is of the joined file.

Result: 72 of 72 files OK, 0 bad.

Correction: an earlier version of this table reported wagon/merchant-wagon.glb as truncated. That was wrong. The part merchant-wagon.glb.5 (323,888 bytes) exists in the repo; my download script skipped the last line of its file list (no trailing newline). Re-checked via the API tree (size 323888, blob c2eb1725) and the raw file (HTTP 200, 323888 bytes, same blob sha).

| # | file | bytes | sha256 | result |
|---|---|---|---|---|
| 1 | `animals36/bull.glb` | 1034328 | `db726e3036d5d6b342442b632e9f9d18d1e783bbaba5984e34d68f311cbf357a` | ok (2 parts) |
| 2 | `animals36/cow.glb` | 1062748 | `08c386d078a6810babd94aa96943a19c2af2b3a0ffed1965e872de59f52bee22` | ok (2 parts) |
| 3 | `animals36/crow.glb` | 1208436 | `0844d86ccfe3a4b8017a501ce88e538dc4f3b36b3f0b80c8725674c96e3f9efa` | ok (2 parts) |
| 4 | `animals36/fluffysheep.glb` | 997656 | `0d4f081da99b8cf923b50df4961f4e1706242d5f749c92be68d5eb79d637718d` | ok (2 parts) |
| 5 | `animals36/goose.glb` | 1407588 | `28d29c7cdfb3eb122b807ae32ac40d69583a2a1992336f6a41d63f4fc0df87d8` | ok (2 parts) |
| 6 | `animals36/peacock.glb` | 1183312 | `ca4e82155d088d925d568b64aa0fa578babaa478c56a0b0c90324a195fe13943` | ok (2 parts) |
| 7 | `animals36/ram.glb` | 1131160 | `4a834d9f427eb5597bd579461b005b1bd49da8c5576afd699eb983c2c4347997` | ok (2 parts) |
| 8 | `animals36/raven.glb` | 973792 | `89d06d7d61c6f0ee8ad258700158125ae80de2ff7331fea756bfc7257c58488a` | ok (2 parts) |
| 9 | `animals36/rooster.glb` | 1105312 | `bcc8381c4c24e7381f98a0fde52e54c6f9308086ec4102d519e3b172a08a983f` | ok (2 parts) |
| 10 | `animals36/sheep.glb` | 1078604 | `13e1a0dada331d409a17e767494900f9f461f809459a64a7c09b90efa5b45039` | ok (2 parts) |
| 11 | `animals36/stag-black.glb` | 925308 | `ce2c43f0e697b48e9b6e721a12c2b2fcd3d92831edb5be03c98066493ca4790f` | ok (2 parts) |
| 12 | `animals36/stag-brown.glb` | 1018468 | `84e752e3412ceb9f3ea50926f6718b4a37391745a27f7667b6654523139ee8b9` | ok (2 parts) |
| 13 | `animals36/stag-olive.glb` | 1006020 | `ae9209a533960d8e3fea961e7064b8322fa082410a10cd912fefa0d6c0b1bc2f` | ok (2 parts) |
| 14 | `animals36/stag-red.glb` | 1024932 | `2b7263ddc9051108cc89484e4f6d9f52e044c9df6315418a574105c38aacdd4d` | ok (2 parts) |
| 15 | `animals36/wolf-white.glb` | 1191704 | `ee25e7deca1d991467bbd3f092d8fe6cd2e514ec2a9ff48812f91efb632e8b15` | ok (2 parts) |
| 16 | `bandit/bandit-lite.glb` | 1420912 | `029be478811ed627fcd04c950ff00912a539567580845346f2c70c7566e0f50f` | ok (2 parts) |
| 17 | `bandit/bandit.glb` | 2764148 | `c2ad00ffbeb1c86f4dced720b45d4427bb3297d78c6eb015bd21d21258884cfa` | ok (4 parts) |
| 18 | `crowd/female-0.bin` | 2402516 | `0844a634a61a2a20941ac9c1a4aa1dcebe32b33a721a539d06358be3fedbe545` | ok (3 parts) |
| 19 | `crowd/male-0.bin` | 2435748 | `d5615a7c3bfdae57d64e8939d563bc05b5e0a0191a004da82e5d8250fb27dc49` | ok (3 parts) |
| 20 | `guard/guard-spear-lite.glb` | 1848980 | `825ef81dac01994eac9bca28b68402ddf9e03998095273bc94be71a88d6d3f6b` | ok (3 parts) |
| 21 | `guard/guard-sword-lite.glb` | 1845076 | `dbdb477b02c877fd8dc81cdd00a86fd0e76c990d9f7e29409f6d67af5429c121` | ok (3 parts) |
| 22 | `horses37/horse-bay.glb` | 1037164 | `89f242918cb4cba825715a2a2c9d52d9d46c8216f91a58abe7e2ec2f42329549` | ok (2 parts) |
| 23 | `horses37/horse-black.glb` | 1089160 | `f32765ed4627c81a5b7c1d2691942098285e4fb6a51536bff4a06109cbfb381f` | ok (2 parts) |
| 24 | `horses37/horse-chestnut.glb` | 996944 | `dd0b72b9b43841e8b799f2cf4d78c2e683cfc5e8f0dce643ea7cc18aaa09b7be` | ok (2 parts) |
| 25 | `horses37/horse-cream.glb` | 1491744 | `d8371c56f61d9debd9a4bf1ba4c3b49d8ab671f953f8231c5e7f200d638d9c15` | ok (2 parts) |
| 26 | `houses/house-1.glb` | 2588040 | `cba3471385a5319eba033924c687b1a588fda291bd59ae44b765314c5220d4c1` | ok (3 parts) |
| 27 | `houses/house-2.glb` | 2376308 | `054c2f63a7bd6305341b3fc906ee78f0ec3c1775e48fdd96a0911c77786c7cb1` | ok (3 parts) |
| 28 | `houses/house-4.glb` | 2400348 | `12b989d8f17a8c24c88225a70953d943376f395d15fb77c4d2de595140c2c52a` | ok (3 parts) |
| 29 | `houses/house-5.glb` | 2313856 | `0043ca48c4568287221c59bfcd8bb2edca26963d0fef305d57fdf580954120f5` | ok (3 parts) |
| 30 | `npcs/hooded-swordsman-v3-rigged-lite.glb` | 1818380 | `22b54f6b9fb051c7a50abe039e3a6cbbb86149b5671f19f87ee044b8f18e4de1` | ok (3 parts) |
| 31 | `npcs/npc-female-rigged.glb` | 2202288 | `a5ade4ecf17e3389bfd9db52894a94ed9bd356f6d1c6cff7d190146382e11371` | ok (3 parts) |
| 32 | `npcs/npc-male-rigged.glb` | 2243876 | `2201fd2a8310a50e89baf966790e61f4e99f88af30284fa394b141e6c4533c79` | ok (3 parts) |
| 33 | `npcs/player-v3-lite.glb` | 1955564 | `b97e5d6cd323384deb46747a07bc5d0481f4ddf2211d515d59912cd0b819e96b` | ok (3 parts) |
| 34 | `npcs/player-v3.glb` | 2857804 | `934423ea1291c94cfcd89255f5bfbba051d3ad83a874ec90174eb44557f96dfa` | ok (4 parts) |
| 35 | `royal-guard/royal-archer-lite.glb` | 2559228 | `e993c5f247d4ec22762fbc1c51f410d2f21f8b20a52401ee353dfd5d19e53866` | ok (3 parts) |
| 36 | `royal-guard/royal-guard-v2-lite.glb` | 1818836 | `298a65e97886d234b072b3d7b39c597fe17b0826894474def0b1f0cebc9ceae0` | ok (3 parts) |
| 37 | `royal-guard/royal-guard-v2.glb` | 3045832 | `7d03ca4754e6bdc3f7db4cf4d8e0a454721abda64a52f1ec01cfb14790efc352` | ok (4 parts) |
| 38 | `royal-guard/royal-swordsman-lite.glb` | 2263972 | `6c424481789da503150f5c7895c4596e0d8ebcbe9efd080a80f7de8e62e6626c` | ok (3 parts) |
| 39 | `shops/barn-v41.glb` | 3499732 | `98af66cb0aeeb62993802a4fda4a7204b8a601e00f4bdaee5eebc6498ed0d924` | ok (4 parts) |
| 40 | `shops/blacksmith-npc.glb` | 2218852 | `0c5263f3eb83f784fbb15c0a8f495d5b66d9fe648ea746d17ae9b48f1dccd4d0` | ok (3 parts) |
| 41 | `shops/blacksmith-v7.glb` | 3457868 | `9900444144d206bfc1f4fb7ddb44781f281cd1db45749e8ba0baae384df8e5b7` | ok (4 parts) |
| 42 | `shops/blacksmith.glb` | 2350308 | `54f39688f9878ab939efc35af599a55f692a355457764578ba4160634c5e0a7d` | ok (3 parts) |
| 43 | `shops/food-shop.glb` | 2373184 | `49863a61c696d24785f67451dafa904826d3f3ed4b459a9f4d54ddc5437b9c35` | ok (3 parts) |
| 44 | `shops/food-v5.glb` | 2034968 | `5a5cf4aac210aa4879ba4c18bac665755187d8fb62f90218d95169d53b547ca9` | ok (3 parts) |
| 45 | `shops/food-vendor.glb` | 1877716 | `0eff6ced0f1eb5312dec9064aab7e3e9e9acb47c5f703e8edcee15ba3e658174` | ok (3 parts) |
| 46 | `shops/potion-seller.glb` | 2364512 | `1ab232cca1f37946830431e0cd0ba3ddbe4847a745f806f3bfb04b31b8c3439e` | ok (3 parts) |
| 47 | `shops/potion-shop-lite.glb` | 1349740 | `d669736170a6fbab1e8d2256f77374545a777f8fad683489fb7cbb75f9370aa8` | ok (2 parts) |
| 48 | `shops/potion-shop.glb` | 3286788 | `84a20c490b6b3cf2f03850d577d9834c4a32a294b9528c98a048f12ba0389fa3` | ok (4 parts) |
| 49 | `shops/stable-keeper.glb` | 1813220 | `93c4e2423e237a4f6a8bcb42f8a4138a9c70a519831d6980657ba52699089e88` | ok (3 parts) |
| 50 | `shops/stable-v6.glb` | 3435744 | `3ecdd039d4e2cacf0f85505c269660885084e205009daa0b57ac4ea31be35f3b` | ok (4 parts) |
| 51 | `shops/stable.glb` | 2292988 | `5d72444c637da468eedeeeedba6d38c68c03b400229213588c25f981ff190ff7` | ok (3 parts) |
| 52 | `shops/supply-seller.glb` | 2737428 | `661481ba1791d06250166c7980e08fbc98e69aad161e2613550c118db7d394e2` | ok (4 parts) |
| 53 | `shops/supply-shop-lite.glb` | 1093788 | `df6e6a6139c7134310b1c69babdca1cb79ad10ccb16b5f95eb06d65d56aa1650` | ok (2 parts) |
| 54 | `shops/supply-shop.glb` | 2808072 | `57a85f5e05f846cd9f3750f86a545d2844eec6c40810bd34b4cbb1f7ceff87b8` | ok (4 parts) |
| 55 | `trees33/maple-dense.glb` | 2641744 | `68deb21f3c1fefd2d7e2b1e8d67bbea349b7cdd1a0c04421b25eeb72d4b1684b` | ok (4 parts) |
| 56 | `trees33/maple-large.glb` | 2603812 | `340b74ca003dab04028249e4be63e4598cb419ff953e9324ae6beb4707c09f29` | ok (3 parts) |
| 57 | `trees33/maple-medium.glb` | 2565816 | `b59a7d3e9073f1c32c8f534661175232662562a109059d4f27c06904ff6820c7` | ok (3 parts) |
| 58 | `trees33/maple-small.glb` | 2517124 | `87346e38cd3327d947bdb4ec3c744dd6b9f06d16e29b0856c85c5e178a8bceee` | ok (3 parts) |
| 59 | `trees33/oak-dense.glb` | 1486156 | `1bd50d0f79966a6d91989eaf3f3d5e85cac2749cd42d6c11c6b343f66cf58dc9` | ok (2 parts) |
| 60 | `trees33/oak-large.glb` | 1403804 | `52a1aba03ec55575071da1a120d61914edd8a625431e38d57948f1fbf66690d8` | ok (2 parts) |
| 61 | `trees33/oak-medium.glb` | 1361936 | `95fcb6b8b0ff26ef19ccc459dfcbca9b82afbfd4245c8b07816329ed1393af2e` | ok (2 parts) |
| 62 | `trees33/oak-small.glb` | 1282012 | `55c365c19e5a02cad7737ca1aa66ae638732d5f2eefd0da2b16b91ce6fe4ab8b` | ok (2 parts) |
| 63 | `trees33/pine-dense.glb` | 2324176 | `2ede63982eebaea28be13c455527dc50f0aed5f07d630cc7941a17770e103f09` | ok (3 parts) |
| 64 | `trees33/pine-large.glb` | 2307428 | `9fdbc45310f6e17b590080ab2aba2f4052a91c4749eee0b9a35106cf57a7326d` | ok (3 parts) |
| 65 | `trees33/pine-medium.glb` | 2306856 | `12ddfaea28c17f28539991fc55d3293963afc98795609e9e611809c9d79b4c19` | ok (3 parts) |
| 66 | `trees33/pine-small.glb` | 2330332 | `51b40c4299bd0075ca919d2b7a1f2713067d40d453d8659c7e007e783a4765bb` | ok (3 parts) |
| 67 | `village/village-fence-1-v3b.glb` | 1526584 | `2097325e3ef03c2802a1dbad40ad010e67ce3c8a35791a0338965251c3019a23` | ok (2 parts) |
| 68 | `village/village-house-1-v3b.glb` | 4716880 | `d2b5792f89d8dfa0c51214a0f8433499eb845123f44608ddd9acb24bf13d1d11` | ok (6 parts) |
| 69 | `village/village-house-3-lite-v3b.glb` | 1093460 | `38f6aa79896ec9a5b52235a51119b4a51ddd4483d848220e43b1f791fcd74fd0` | ok (2 parts) |
| 70 | `village/village-house-3-v3b.glb` | 4845468 | `931485933c5dab68248305e78157747b46a05e0e8149b9bab762ba4bd0d2eb04` | ok (6 parts) |
| 71 | `wagon/merchant-wagon-lite.glb` | 1152584 | `269ff04a6f06f56e7658145db43ea26d53c5b24406ea85e05c822ebf22c3e902` | ok (2 parts) |
| 72 | `wagon/merchant-wagon.glb` | 4723888 | `dd3c6a527396c7545fcc936473f92600e839e6c14a6f4a891b12b87a15c6a9bc` | ok (6 parts) |
