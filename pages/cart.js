// import Link from 'next/link';
// import prisma from 'utils/prisma';

// const Cart = ({ cartItems}) => {
//   return (

//       <div className="w-[1440px] h-[749px] relative bg-stone-50">
//         <div className="left-[188px] top-[64px] absolute text-indigo-950 text-4xl font-normal leading-[50.40px]">Your shopping cart</div>
//         <div className="left-[188px] top-[162px] absolute text-indigo-950 text-sm font-normal leading-tight">Product</div>
//         <div className="left-[838px] top-[162px] absolute text-indigo-950 text-sm font-normal leading-tight">Quantity</div>
//         <div className="left-[1212px] top-[162px] absolute text-indigo-950 text-sm font-normal leading-tight">Total</div>
//         <div className="left-[1212px] top-[225px] absolute text-indigo-950 text-lg font-normal leading-[27px]">£85</div>
//         <div className="left-[1209px] top-[380px] absolute text-indigo-950 text-lg font-normal leading-[27px]">£125</div>
//         <div className="left-[188px] top-[214px] absolute justify-start items-center gap-[21px] inline-flex">
//           <img className="w-[109px] h-[134px] relative" src="https://via.placeholder.com/109x134" />
//           <div className="flex-col justify-start items-start gap-2 inline-flex">
//             <div className="text-indigo-950 text-xl font-normal leading-7">Graystone vase</div>
//             <div className="text-indigo-950 text-sm font-normal leading-[21px]">A timeless ceramic vase with <br />a tri color grey glaze.</div>
//             <div className="text-indigo-950 text-base font-normal leading-normal">£85</div>
//           </div>
//         </div>
//         <div className="left-[188px] top-[368px] absolute justify-start items-center gap-[21px] inline-flex">
//           <img className="w-[109px] h-[134px] relative" src="https://via.placeholder.com/109x134" />
//           <div className="flex-col justify-start items-start gap-2 inline-flex">
//             <div className="text-indigo-950 text-xl font-normal leading-7">Basic white vase</div>
//             <div className="text-indigo-950 text-sm font-normal leading-[21px]">Beautiful and simple this is<br />one for the classics</div>
//             <div className="text-indigo-950 text-base font-normal leading-normal">£85</div>
//           </div>
//         </div>
//         <div className="w-[1064px] h-[0px] left-[188px] top-[194px] absolute border border-slate-200"></div>
//         <div className="w-[1064px] h-[0px] left-[188px] top-[534px] absolute border border-slate-200"></div>
//         <div className="left-[970px] top-[562px] absolute flex-col justify-start items-end gap-3 inline-flex">
//           <div className="justify-start items-center gap-4 inline-flex">
//             <div className="text-right text-indigo-800 text-xl font-normal leading-7">Subtotal</div>
//             <div className="text-right text-indigo-950 text-2xl font-normal leading-[33.60px]">£210</div>
//           </div>
//           <div className="text-right text-indigo-800 text-sm font-normal leading-[21px]">Taxes and shipping are calculated at checkout</div>
//         </div>
//         <div className="w-[122px] px-4 py-3 left-[838px] top-[226px] absolute bg-stone-50 border justify-between items-center gap-[33px] inline-flex">
//           <div className="text-slate-200 text-base font-normal">-</div>
//           <div className="text-indigo-950 text-base font-normal">1</div>
//           <div className="text-slate-200 text-base font-normal">+</div>
//         </div>
//         <div className="w-[122px] px-4 py-3 left-[838px] top-[380px] absolute bg-stone-50 border justify-between items-center gap-[33px] inline-flex">
//           <div className="text-slate-200 text-base font-normal">-</div>
//           <div className="text-indigo-950 text-base font-normal">1</div>
//           <div className="text-slate-200 text-base font-normal">+</div>
//         </div>
//         <div className="px-8 py-4 left-[1080px] top-[645px] absolute bg-indigo-950 border justify-start items-start gap-2.5 inline-flex">
//           <div className="text-white text-base font-normal leading-normal">Go to checkout</div>
//         </div>
//       </div>


//   )}

// export async function getServerSideProps() {
//   const cartItems = await prisma.Cart.findMany();
//   const serializedCartItems = JSON.parse(JSON.stringify(cartItems));

//   return { props: { cartItems: serializedCartItems } };
// }

// export default Cart;
