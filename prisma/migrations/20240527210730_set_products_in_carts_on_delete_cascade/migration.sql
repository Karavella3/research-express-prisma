-- DropForeignKey
ALTER TABLE "ProductsInCarts" DROP CONSTRAINT "ProductsInCarts_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ProductsInCarts" DROP CONSTRAINT "ProductsInCarts_productId_fkey";

-- AddForeignKey
ALTER TABLE "ProductsInCarts" ADD CONSTRAINT "ProductsInCarts_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductsInCarts" ADD CONSTRAINT "ProductsInCarts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
