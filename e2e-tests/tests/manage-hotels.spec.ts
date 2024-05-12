import {test,expect} from 
"@playwright/test"
import exp from "constants";
import path from 'path';
const UI_URL=" http://localhost:5173/";
test.beforeEach(async({page})=>{
     await page.goto(UI_URL);
 //get the sign in button
  await page.getByRole("link",{name:"Sign In"}).click();

  await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole('button',{name:"Login"}).click();

  await expect(page.getByText("Sign in Successful!")).toBeVisible();
});

test("should allow user to add a hotel ",async({page})=>{
    await page.goto(`${UI_URL}add-hotel`)
    await page.locator('[name="name"]').fill("Test Hotel");
    await page.locator('[name="city"]').fill("Test city");
    await page.locator('[name="country"]').fill("Test country");
    await page.locator('[name="description"]').fill("Test descrption aesdfb h sfd ");

    await page.locator('[name="pricePerNight"]').fill("100");

    await page.selectOption('select[name="starRating"]',"3")
    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").click();
    await page.getByLabel("Parking").click();

    await page.locator('[name="adultCount"]').fill("2");
    await page.locator('[name="childCount"]').fill("3");

    await page.setInputFiles('[name="imageFiles"]',[
        path.join(__dirname,"files","1.jpg"),
        path.join(__dirname,"files","2.jpg"),
    ]);
    await page.getByRole('button',{name:"Save"}).click();
    await expect(page.getByText("Hotel Saved!")).toBeVisible();
})
test("should edit hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector('[name="name"]', { state: "attached" });
  await expect(page.locator('[name="name"]')).toHaveValue("Dublin Getaways");
  await page.locator('[name="name"]').fill("Dublin Getaways UPDATED");
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText("Hotel Saved!")).toBeVisible();

  await page.reload();

  await expect(page.locator('[name="name"]')).toHaveValue(
    "Dublin Getaways UPDATED"
  );
  await page.locator('[name="name"]').fill("Dublin Getaways");
  await page.getByRole("button", { name: "Save" }).click();
});