import Page from '../models/Page.js';
import { logActivity } from '../utils/activity.js';

export const defaultPages = [
  {
    title: 'About Us',
    slug: 'about-us',
    content: '<h2>About Us</h2><p>Welcome to Roidspharma. We are your official reliable steroid shop, providing secure payments and fast shipping.</p>'
  },
  {
    title: 'Contact Us',
    slug: 'contact-us',
    content: '<h2>Contact Us</h2><p>Have questions? Email us at support@roidspharma.com</p>'
  },
  {
    title: 'Privacy Policy',
    slug: 'privacy-policy',
    content: '<h2>Privacy Policy</h2><p>Your privacy is important to us. We secure your personal data.</p>'
  },
  {
    title: 'Conditions of Use',
    slug: 'conditions',
    content: '<h2>Conditions of Use</h2><p>Please read our conditions of use before ordering from Roidspharma.</p>'
  },
  {
    title: 'Terms & Conditions',
    slug: 'terms-conditions',
    content: '<h2>Terms & Conditions</h2><p>Please read our terms and conditions before placing an order.</p>'
  },
  {
    title: 'Shipping',
    slug: 'shipping',
    content: `<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
  <div>
    <p class="font-bold underline mb-4">
      Zelle and Venmo payments are approved within 4-5 business days after payment is made.
      The delivery times below apply after this 4-5 day approval period.
    </p>

    <p class="text-primary italic font-semibold mb-6">
      After processing your order payment, the following delivery times apply based on the brands.
    </p>

    <p class="font-bold underline mb-3">US Domestic warehouses delivery times:</p>

    <div class="flex flex-col gap-3 mb-6">
      <p><span class="font-semibold">Xeno Labs</span> USA: 4-6 business days</p>
      <p>
        <span class="font-semibold">Xt Labs</span> USA: 6-8 business days 
        <em>(After we provide you with the tracking number, it will take 3-5 business days for it to become trackable. Please do not request status updates about your tracking number before this period.)</em>
      </p>
      <p><span class="font-semibold">Peptide Plus</span> 4-5 business days</p>
      <p><span class="font-semibold">Aslan Pharma</span> 5-6 business days</p>
      <p>
        <span class="font-semibold">Omega Labs</span> 6-8 business days 
        <em>(After we provide you with the tracking number, it will take 3-5 business days for it to become trackable. Please do not request status updates about your tracking number before this period.)</em>
      </p>
      <p>
        <span class="font-semibold">Bull Pharma</span> 6-8 business days 
        <em>(After we provide you with the tracking number, it will take 3-5 business days for it to become trackable. Please do not request status updates about your tracking number before this period.)</em>
      </p>
      <p><span class="font-semibold">Crowx Labs</span> USA: 6-7 business days</p>
      <p><span class="font-semibold">Sixpex</span> USA: 4-6 business days</p>
      <p><span class="font-semibold">Ryzen Pharma</span> USA: 5-7 business days.</p>
      <p><span class="font-semibold">No Label Peptides:</span> 2-5 business days.</p>
      <p><span class="font-semibold">Beligas</span> Pharma USA: 5-7 business days</p>
      <p><span class="font-semibold">Hutech Labs</span> USA: 6-9 business days.</p>
      <p><span class="font-semibold">Nakon Pharma</span> USA: 6-9 business days.</p>
      <p><span class="font-semibold">Ultima Pharma</span> USA: 10-12 business days.</p>
      <p><span class="font-semibold">Hubio Pharm</span> USA: 5-6 business days</p>
      <p><span class="font-semibold">Hygene Pharm:</span> 5-6 business days</p>
    </div>
  </div>

  <div>
    <div class="flex flex-col gap-3 mb-6">
      <p>
        <span class="font-semibold">Beligas Pharma</span> INT 15-20 business days to US &nbsp;--- to EU 10-15 business days
      </p>
      <p>
        <span class="font-semibold">Ultima Pharma</span> INT 15-20 business days to US &nbsp;--- to EU 10-15 business days
      </p>
      <p>
        <span class="font-semibold">Nakon Medical</span> INT 15-20 business days to US &nbsp;--- to EU 10-15 business days
      </p>
      <p>
        <span class="font-semibold">Deus Medical</span> 7-15 business days to US &nbsp;--- to EU 5-10 business days
      </p>
      <p>
        <span class="font-semibold">Human Grade Products</span> 15 business days to US &nbsp;--- to EU 5-10 business days
      </p>
    </div>

    <p class="text-lg font-semibold underline mb-2">
      UK DOMESTIC Warehouses Delivery Times:
    </p>
    <p class="mb-6">All of them 1-3 business days UK to UK</p>

    <p class="text-xl font-bold underline mb-3">Shipping</p>
    <p class="mb-3">You can read the features of our regular shipment:</p>
    <p class="mb-3">
      Each order is shipped and tracking numbers of shipments are emailed in 3-4 business days from the day we received the payment.
    </p>
    <p class="mb-3">
      All of orders are packed and shipped by using reliable and discreet methods.
    </p>

    <p class="mb-4">
      <span class="font-bold">NOTE:</span> 
      <span class="text-primary">
        Because we handle a large number of orders daily, the item you chose might sometimes become unavailable. To prevent any hold-ups, we will automatically send you a substitute product with equivalent dosage and quality, without needing to check with you first.
      </span>
    </p>

    <p class="font-bold mb-2">Warning for international shipment orders:</p>
    <p class="font-bold text-primary mb-3">
      FOR INTERNATIONAL ORDERS: (NOT FOR US or UK DOMESTIC)
    </p>

    <p class="underline mb-3">
      Please wait at least 4 weeks before contacting us regarding non-arrival shipments.
      If your order gets seized at custom of your country please contact us immediately
      with a scanned copy of the seizure letter and new shipping address. Your order will
      be re-shipped for free right away.
    </p>

    <p class="mb-3">
      .(We do not have reships to Australia, Canada, New Zealand, Sweden, Finland,
      Denmark, Korea, Philippines, Switzerland.) Please contact us for other countries.
    </p>

    <p class="mb-3">
      All shipments are delivered by first-class, priority regular registered airmail
      service. You can email us to learn tracking number of your shipment if you don't
      get a working tracking number in 3 business days from the day you emailed us the
      payment informations.
    </p>

    <p class="mb-3">Regular shipping cost is $35 for every order.</p>
    <p class="mb-3">
      Estimated time of arrival is 12 to 17 business days except for USA Domestic: 4-5 business days after shipped.
    </p>
  </div>
</div>`
  },
  {
    title: 'Why Roidspharma?',
    slug: 'why-roidspharma',
    content: `<h2>Why Choose Roidspharma?</h2>
<p>We pride ourselves on offering high-quality steroids, secure payments, and worldwide shipping.</p>
<ul>
  <li><strong>Premium Quality:</strong> All products are laboratory tested.</li>
  <li><strong>Secure Checkout:</strong> Multiple payment options including Crypto, Zelle, and Venmo.</li>
  <li><strong>Discreet Packaging:</strong> Safe shipping options to ensure delivery.</li>
</ul>`
  },
  {
    title: 'Steroid Info Guide',
    slug: 'steroids-guide',
    content: `<h2>Steroid Info Guide</h2>
<p>Learn about dosage, cycle protocols, and PCT guidelines to ensure safe and effective cycles.</p>
<p>Always consult with a professional and ensure regular lab testing.</p>`
  },
  {
    title: 'Payments for Steroids',
    slug: 'payment-methods',
    content: `<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
  <div>
    <p class="font-bold text-gray-800 mb-4 text-base">The average processing times for payments based on payment methods are as follows:</p>
    <ul class="flex flex-col gap-3 mb-6 list-disc pl-5">
      <li><strong>Zelle:</strong> 2-4 business days</li>
      <li><strong>Venmo:</strong> 3-4 business days</li>
      <li><strong>CashApp:</strong> 3-4 business days</li>
      <li><strong class="text-secondary">Credit Card</strong> (Please request us via email way we will send you payment link)</li>
      <li><strong class="text-secondary">Bitcoin</strong> and other cryptocurrencies: Same business day</li>
      <li><strong>Western Union:</strong> 1-3 business days</li>
      <li><strong>Mg:</strong> 1-3 business days</li>
    </ul>
  </div>

  <div>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">
      This means that after you make your payment, it will reach us within the timeframes mentioned above. Following this, your order will be shipped within 1-2 business days. If you prefer faster delivery, please choose payment methods such as cryptocurrency, Western Union, Mg, or Credit Card (Stripe).
    </p>

    <h3 class="text-lg font-bold text-gray-900 mb-3">We Advice You To Pay With Bitcoin (BTC) Or Litecoin (LTC). Why?</h3>
    <ul class="flex flex-col gap-2.5 mb-6 list-none pl-0">
      <li>- 100% secure- Almost 0 commission or fee</li>
      <li>- Decentralized so 100% secure.</li>
      <li>- So fast. In minutes we get your payment so no need to wait like WU and MG collecting. Your order is shipped instant.</li>
      <li>- And finally 10% discount at the end of the order.</li>
    </ul>
    
    <p class="mt-4">
      <a href="/buy-steroids-bitcoin" class="text-secondary font-bold hover:underline">&gt;Here is link how easy to pay Bitcoin</a>
    </p>
  </div>
</div>`
  },
  {
    title: 'Buy Steroids Bitcoin',
    slug: 'buy-steroids-bitcoin',
    content: `<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
  <div>
    <h3 class="text-lg font-bold text-gray-900 mb-3">What Is Bitcoin?</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">
      <span class="text-secondary font-semibold">Bitcoin</span> is a virtual Money currency that has been created for users that wants to send or accept Money on the internet safely. It has no physical being whatsoever. The whole idea behind the Bitcoin is based on anonymity and cutting the middle man on Money transfers. It is a crypted peer to peer payment system that allows us making or receiving payments and NOT sharing any information with any third party.
    </p>

    <h3 class="text-lg font-bold text-gray-900 mb-3">Making / Receiving Payments</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">
      For sending or receiving Bitcoins, we need a Bitcoin wallet; which is an app or a software that can be used both on your phone or computer. Online Money transfer becomes very easy and cheap with this revolution called Bitcoin. We install the wallet program, type in the amount, type in the receivers address and hit send. That is it. After we press send, our payment becomes cryptedly stored somewhere on the internet.
    </p>

    <h3 class="text-lg font-bold text-gray-900 mb-3">How Easy? How Secure?</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">
      When you make payments with your debit or credit cards, there some issues like 3D security, subscriptions and other difficulties that you might be required to share some information with a third party. These are rather more difficult ways than making payments with Bitcoin. Because with Bitcoin, you would only be typing in address and the amount. There no other information or process will be required from you. Even when you make your payments with Western Union, you need an account and subscription to make or receive payments. This means you share your information with a third party. With Bitcoin payment, you have a truest anonymity. Even though Bitcoin is an open source program and everyone can see everything, this might not necessarily means you are not anonymous.
    </p>

    <h3 class="text-lg font-bold text-gray-900 mb-3">The System</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">
      The Bitcoin system is based on "decentralization" of everything in need to make the system work. Open source code system and the idea and the system behind the "mining" makes Bitcoin is an uncontrollable for anyone. Everyday, individuals help and check and control the transactions with allowing their computer to be a part of collective Bitcoin computer. This way, people let Bitcoin system use their computer power to make and inspect the transactions on Bitcoin universe. For this generosity, a small amount of Bitcoin is rewarded to them. This way nobody can monopolise the Bitcoin mining pools because the reward is so little that you must literally calculate your electric bill and other costs while your computer is mining.
    </p>
  </div>

  <div>
    <ul class="flex flex-col gap-3.5 mb-6 list-none pl-0">
      <li>o You need to open a Bitcoin Wallet (account). You can use Electrum, Blockchain or Binance to create it. Now you have a bitcoin wallet number.</li>
      <li>o Visit Paybis.com sign up after confirming your Paybis account you can buy bitcoin to your bitcoin wallet number through your credit card or debit card.</li>
      <li>o At this step, you have bitcoins in your wallet. Finally, you need to send the bitcoins you bought from your wallet to our wallet. You can see our wallet number at 6th step of your order or you can find it the order-confirmation e-mail we sent eftsoon you placed the order.</li>
      <li>o That's all. Payment was completed. Please do not forget to send an e-mail regarding you made the payment info@getroids1.net.</li>
      <li>o Also, we share a video regarding how to buy bitcoins with credit card:<br/><a href="https://www.youtube.com/watch?v=hhg_pvk4w5E" target="_blank" class="text-secondary hover:underline">https://www.youtube.com/watch?v=hhg_pvk4w5E</a></li>
    </ul>

    <h3 class="text-lg font-bold text-gray-900 mt-6 mb-3">THIRD OPTION COINBASE (Most Trustfull Exchange For USA Clients)</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      There are many investors on the world who use coinbase for bitcoin trades and sending-receiving transactions. Coinbase has more than 70 million users in over 100 countries. Coinbase includes more than 1000 cryptocurrencies in application. Click here to create an Coinbase account.
    </p>

    <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong>What are advantages of Coinbase?</strong></p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">High level security. 100% legal. Easy using. Insurance opportunity.</p>

    <p class="text-sm text-gray-700 leading-relaxed mb-2"><strong>What are Disadvantages of Coinbase?</strong></p>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">Higher fees than other applications. Only to use USA, UK and Europe countries.</p>

    <h3 class="text-lg font-bold text-gray-900 mb-3">OTHER OPTION TRUST WALLET</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      - <strong>First download Trust Wallet App for your phone.</strong> App will provide you 12 keywords please keep it for recovering your wallet.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      - <strong>On the Wallet page, click the "Buy" button</strong> and choose cryptocurrency selected while your are placing order on Getroids1.net (BTC and LTC most popular)
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      - <strong>Enter the amount to buy in USD</strong> - Complete your purchase with Apple Pay or Credit card. After your payment complete go back to your wallet and click send button.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      - <strong>Choose the currency (placed order on Getroids1.net)</strong> LTC or BTC - Scan or paste Cryptocurrency address (provided on Getroids1.net order page) and enter total amount of your order and your order will be finalized.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      - <strong>Now everything is okey.</strong> Open your Getroids1.net account and click submit payment
    </p>
  </div>
</div>`
  },
  {
    title: 'Buy Steroids with Credit Card',
    slug: 'buy-steroids-credit-card',
    content: `<div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
  <div>
    <img src="/assets/credit-card-payment-for-anabolic-steroids-new.jpg" alt="Credit Card Accepted" class="w-full h-auto rounded-lg shadow-md mb-6" />
    
    <h3 class="text-lg font-bold text-gray-900 mb-3">FIRST OPTION IS CASH APP (Click Detailed Guide For Cash App)</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      The majority knows what a Cash App is thanks to its strong level of protection and user-friendly forms of payment. This payment service technology provides an opportunity to convert one mobile application to another with a snap of the fingers. Launched in 2013, it quickly gained extreme popularity among millions of users. Join a Cash App community here.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      <strong>Pros:</strong> Swift, smooth and easy transactions. Secure. Investment in stock with no commissions. Compensations facilitation.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">
      <strong>Cons:</strong> No FDIC coverage. First 30 days of using have some limitations. The usage of this app is only possible in the USA and the UK.
    </p>

    <h3 class="text-lg font-bold text-gray-900 mb-3">SECOND OPTION IS PAYBIS</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">
      PAYBIS is one of the safest platform to buy bitcoin via credit card or debit card. It is faster other bitcoins exchange platforms as well. Paybis offers the lowest commission rate. Those're why we said that as first choice.
    </p>
  </div>

  <div>
    <h3 class="text-lg font-bold text-gray-900 mb-3">How Can I Buy Bitcoin With PAYBIS.COM ?</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      As explained above, at first you need to make your order from our website to know how much bitcoins you will need. After you did that. Visit Paybis.com and follow these steps below:
    </p>
    <ul class="flex flex-col gap-3 mb-6 list-none pl-0">
      <li>o You need to open a bitcoin wallet (account). You can use Electrum, Blockchain or Binance to create it. Now you have a bitcoin wallet number.</li>
      <li>o Visit paybis.com sign up after confirming your paybis account you can buy bitcoin to your bitcoin wallet number through your credit card or debit card.</li>
      <li>o At this step, you have bitcoins in your wallet. Finally, you need to send the bitcoins you bought from your wallet to our wallet. You can see our wallet number at 6th step of your order or you can find it the order-confirmation e-mail we sent eftsoon you placed the order.</li>
      <li>o That's all. Payment was completed. Please do not forget to send an e-mail regarding you made the payment info@getroids1.net.</li>
      <li>o Also, we share a video regarding how to buy bitcoins with credit card:<br/><a href="https://youtu.be/gNWuU55OEfg" target="_blank" class="text-secondary hover:underline">https://youtu.be/gNWuU55OEfg</a></li>
    </ul>

    <h3 class="text-lg font-bold text-gray-900 mb-3">THIRD OPTION COINBASE</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      ... cashapp.com or any other Bitcoin exchange platform.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      <strong>4- Final step:</strong> Send the Bitcoins you bought from your wallet to our wallet. You can find our Bitcoin wallet address (You will pay to this wallet address) at the section of payment methods. You should choose Bitcoin Payment Method. After you finish payment just let us know transaction is done. We will check our Bitcoin account and we will ship out your order at once. Bitcoin is the fastest, the most secure and easiest way to pay.
    </p>
    
    <h3 class="text-lg font-bold text-gray-900 mb-3">OTHER OPTION BitBuy</h3>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      BitBuy is best place to buy bitcoin who live in Canada people. Canada government has strict rules to buy bitcoin but if you use BitBuy it is not difficult for Canadian citizens. Especially we advise this company for Canada users. Click here to create an BitBuy account.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      <strong>What are advantages of BitBuy?</strong><br/>
      Audited and Registered. Low transaction fees. So secure. Easy using. 9 most popular cryptocurrencies available.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-4">
      <strong>What are Disadvantages of BitBuy?</strong><br/>
      Only available in Canada and only accepting CAD currency.
    </p>
    <p class="text-sm text-gray-700 leading-relaxed mb-6">
      <strong>Other great famous platforms:</strong> Blockchain, Kraken, Huobi, Crypto, Mexc, Poloniex, Coinmama, LocalBitcoins, Gemini, Binance, Uphold, Gate, KuCoin, FTX, Bitfinex, ByBit, and many others.
    </p>

    <h3 class="text-lg font-bold text-gray-900 mb-3">In the end, here is a short summary for Bitcoin Payment Selections:</h3>
    <ul class="flex flex-col gap-2 list-disc pl-5">
      <li>Best for beginners: Cash App</li>
      <li>To buy Bitcoin quickly: Coinmama</li>
      <li>Best overall: Coinbase</li>
      <li>To buy Bitcoin anonymously: LocalBitcoins, Blockchain, TrustWallet, Metamask</li>
    </ul>
  </div>
</div>`
  }
];

const ensurePages = async () => {
  await Promise.all(
    defaultPages.map((page) =>
      Page.findOneAndUpdate({ slug: page.slug }, { $setOnInsert: page }, { upsert: true, new: true })
    )
  );
};

export const listPages = async (req, res) => {
  await ensurePages();
  res.json(await Page.find().sort({ title: 1 }));
};

export const getPageBySlug = async (req, res) => {
  await ensurePages();
  const page = await Page.findOne({ slug: req.params.slug });
  if (!page) {
    res.status(404);
    throw new Error('Page not found');
  }
  res.json(page);
};

export const updatePage = async (req, res) => {
  await ensurePages();
  const page = await Page.findOneAndUpdate(
    { slug: req.params.slug },
    { content: req.body.content || '', status: req.body.status ?? true },
    { new: true }
  );
  if (!page) {
    res.status(404);
    throw new Error('Page not found');
  }
  await logActivity(`Updated page ${page.title}`, 'update');
  res.json(page);
};
