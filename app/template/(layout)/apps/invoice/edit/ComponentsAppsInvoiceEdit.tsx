"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

import IconDownload from "@/components/icon/icon-download";
import IconEye from "@/components/icon/icon-eye";
import IconSave from "@/components/icon/icon-save";
import IconSend from "@/components/icon/icon-send";
import IconX from "@/components/icon/icon-x";
import Logo from "@/components/compose/Logo";

const ComponentsAppsInvoiceEdit = () => {
  const currencyList = [
    "USD - US Dollar",
    "GBP - British Pound",
    "IDR - Indonesian Rupiah",
    "INR - Indian Rupee",
    "BRL - Brazilian Real",
    "EUR - Germany (Euro)",
    "TRY - Turkish Lira",
  ];
  const [tax, setTax] = useState<any>(0);
  const [discount, setDiscount] = useState<any>(0);
  const [shippingCharge, setShippingCharge] = useState<any>(0);
  const [paymentMethod, setPaymentMethod] = useState<any>("bank");

  const [items, setItems] = useState<any>([
    {
      id: 1,
      title: "Calendar App Customization",
      description: "Make Calendar App Dynamic",
      quantity: 2,
      amount: 120,
      isTax: false,
    },
    {
      id: 2,
      title: "Chat App Customization",
      description: "Customized Chat Application to resolve some Bug Fixes",
      quantity: 1,
      amount: 25,
      isTax: false,
    },
  ]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD - US Dollar");
  const [params, setParams] = useState<any>({
    title: "Tailwind",
    invoiceNo: "#0001",
    to: {
      name: "Jesse Cory",
      email: "redq@company.com",
      address: "405 Mulberry Rd. Mc Grady, NC, 28649",
      phone: "(128) 666 070",
    },
    invoiceDate: "",
    dueDate: "",
    bankInfo: {
      no: "1234567890",
      name: "Bank of America",
      swiftCode: "VS70134",
      country: "United States",
      ibanNo: "K456G",
    },
    notes:
      "It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!",
  });
  useEffect(() => {
    let dt: Date = new Date();
    const month =
      dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1;
    let date = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    setParams({
      ...params,
      invoiceDate: dt.getFullYear() + "-" + month + "-" + date,
      dueDate: dt.getFullYear() + "-" + month + "-" + date,
    });
  }, []);

  const addItem = () => {
    let maxId = 0;
    maxId = items?.length
      ? items.reduce(
          (max: number, character: any) =>
            character.id > max ? character.id : max,
          items[0].id
        )
      : 0;

    setItems([
      ...items,
      {
        id: maxId + 1,
        title: "",
        description: "",
        rate: 0,
        quantity: 0,
        amount: 0,
      },
    ]);
  };

  const removeItem = (item: any = null) => {
    setItems(items.filter((d: any) => d.id !== item.id));
  };

  const changeQuantityPrice = (type: string, value: string, id: number) => {
    // const list = items;
    const item = items.find((d: any) => d.id === id);
    if (type === "quantity") {
      item.quantity = Number(value);
    }
    if (type === "price") {
      item.amount = Number(value);
    }
    setItems([...items]);
  };

  return (
    <div className="flex flex-col gap-2.5 xl:flex-row">
      <div className="panel flex-1 px-0 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
        <div className="flex flex-wrap justify-between px-4">
          <div className="mb-6 w-full lg:w-1/2">
            <div className="flex shrink-0 items-center text-black dark:text-white">
              <Logo className="w-8 h-8 md:w-12 md:h-12  text-primary" />
            </div>
            <div className="mt-6 space-y-1 text-gray-500 dark:text-gray-400">
              <div>13 Tetrick Road, Cypress Gardens, Florida, 33884, US</div>
              <div>Anthill@gmail.com</div>
              <div>+1 (070) 123-4567</div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:max-w-fit">
            <div className="flex items-center">
              <label htmlFor="number" className="mb-0 flex-1 ltr:mr-2 rtl:ml-2">
                Invoice Number
              </label>
              <input
                id="number"
                type="text"
                name="inv-num"
                className="form-input w-2/3 lg:w-[250px]"
                placeholder="#8801"
                defaultValue={params.invoiceNo}
              />
            </div>
            <div className="mt-4 flex items-center">
              <label
                htmlFor="invoiceLabel"
                className="mb-0 flex-1 ltr:mr-2 rtl:ml-2"
              >
                Invoice Label
              </label>
              <input
                id="invoiceLabel"
                type="text"
                name="inv-label"
                className="form-input w-2/3 lg:w-[250px]"
                placeholder="Enter Invoice Label"
                defaultValue={params.title}
              />
            </div>
            <div className="mt-4 flex items-center">
              <label
                htmlFor="startDate"
                className="mb-0 flex-1 ltr:mr-2 rtl:ml-2"
              >
                Invoice Date
              </label>
              <input
                id="startDate"
                type="date"
                name="inv-date"
                className="form-input w-2/3 lg:w-[250px]"
                defaultValue={params.invoiceDate}
              />
            </div>
            <div className="mt-4 flex items-center">
              <label
                htmlFor="dueDate"
                className="mb-0 flex-1 ltr:mr-2 rtl:ml-2"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                name="due-date"
                className="form-input w-2/3 lg:w-[250px]"
                defaultValue={params.dueDate}
              />
            </div>
          </div>
        </div>
        <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
        <div className="mt-8 px-4">
          <div className="flex flex-col justify-between lg:flex-row">
            <div className="mb-6 w-full lg:w-1/2 ltr:lg:mr-6 rtl:lg:ml-6">
              <div className="text-lg">Bill To :-</div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="reciever-name"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Name
                </label>
                <input
                  id="reciever-name"
                  type="text"
                  name="reciever-name"
                  className="form-input flex-1"
                  defaultValue={params.to.name}
                  placeholder="Enter Name"
                />
              </div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="reciever-email"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Email
                </label>
                <input
                  id="reciever-email"
                  type="email"
                  name="reciever-email"
                  className="form-input flex-1"
                  defaultValue={params.to.email}
                  placeholder="Enter Email"
                />
              </div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="reciever-address"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Address
                </label>
                <input
                  id="reciever-address"
                  type="text"
                  name="reciever-address"
                  className="form-input flex-1"
                  defaultValue={params.to.address}
                  placeholder="Enter Address"
                />
              </div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="reciever-number"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Phone Number
                </label>
                <input
                  id="reciever-number"
                  type="text"
                  name="reciever-number"
                  className="form-input flex-1"
                  defaultValue={params.to.phone}
                  placeholder="Enter Phone number"
                />
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="text-lg">Payment Details:</div>
              <div className="mt-4 flex items-center">
                <label htmlFor="acno" className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2">
                  Account Number
                </label>
                <input
                  id="acno"
                  type="text"
                  name="acno"
                  className="form-input flex-1"
                  defaultValue={params.bankInfo.no}
                  placeholder="Enter Account Number"
                />
              </div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="bank-name"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Bank Name
                </label>
                <input
                  id="bank-name"
                  type="text"
                  name="bank-name"
                  className="form-input flex-1"
                  defaultValue={params.bankInfo.name}
                  placeholder="Enter Bank Name"
                />
              </div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="swift-code"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  SWIFT Number
                </label>
                <input
                  id="swift-code"
                  type="text"
                  name="swift-code"
                  className="form-input flex-1"
                  defaultValue={params.bankInfo.swiftCode}
                  placeholder="Enter SWIFT Number"
                />
              </div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="iban-code"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  IBAN Number
                </label>
                <input
                  id="iban-code"
                  type="text"
                  name="iban-code"
                  className="form-input flex-1"
                  defaultValue={params.bankInfo.ibanNo}
                  placeholder="Enter IBAN Number"
                />
              </div>
              <div className="mt-4 flex items-center">
                <label
                  htmlFor="country"
                  className="mb-0 w-1/3 ltr:mr-2 rtl:ml-2"
                >
                  Country
                </label>
                <select
                  id="country"
                  name="country"
                  className="form-select flex-1"
                  defaultValue={params.bankInfo.country}
                >
                  <option value="">Choose Country</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Australia">Australia</option>
                  <option value="Germany">Germany</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Norway">Norway</option>
                  <option value="New-Zealand">New Zealand</option>
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American-Samoa">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Antigua Barbuda">Antigua &amp; Barbuda</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia">Bosnia &amp; Herzegovina</option>
                  <option value="Botswana">Botswana</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British">British Virgin Islands</option>
                  <option value="Brunei">Brunei</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Cape">Cape Verde</option>
                  <option value="Cayman">Cayman Islands</option>
                  <option value="Central-African">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Costa-Rica">Costa Rica</option>
                  <option value="Croatia">Croatia</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czechia">Czechia</option>
                  <option value="Côte">{`Côte d'Ivoire`}</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican">Dominican Republic</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El-Salvador">El Salvador</option>
                  <option value="Equatorial-Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="Gabon">Gabon</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Greece">Greece</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guernsey">Guernsey</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong-Kong">Hong Kong SAR China</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran">Iran</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Laos">Laos</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon">Lebanon</option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libya">Libya</option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macedonia">Macedonia</option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Moldova">Moldova</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montenegro">Montenegro</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar (Burma)</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="North-Korea">North Korea</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Palestinian">Palestinian Territories</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Romania">Romania</option>
                  <option value="Russia">Russia</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Réunion">Réunion</option>
                  <option value="Samoa">Samoa</option>
                  <option value="San-Marino">San Marino</option>
                  <option value="Saudi-Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra-Leone">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon-Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South-Africa">South Africa</option>
                  <option value="South-Korea">South Korea</option>
                  <option value="Spain">Spain</option>
                  <option value="Sri-Lanka">Sri Lanka</option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syria">Syria</option>
                  <option value="Sao-Tome-and-Principe">
                    São Tomé &amp; Príncipe
                  </option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania">Tanzania</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Timor-Leste">Timor-Leste</option>
                  <option value="Togo">Togo</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad-and-Tobago">
                    Trinidad &amp; Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnam">Vietnam</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 px-4">
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th className="w-1">Quantity</th>
                  <th className="w-1">Price</th>
                  <th>Total</th>
                  <th className="w-1"></th>
                </tr>
              </thead>
              <tbody>
                {items.length <= 0 && (
                  <tr>
                    <td colSpan={5} className="!text-center font-semibold">
                      No Item Available
                    </td>
                  </tr>
                )}
                {items.map((item: any, index: any) => {
                  return (
                    <tr className="align-top" key={item.id}>
                      <td>
                        <input
                          type="text"
                          className="form-input min-w-[200px]"
                          placeholder="Enter Item Name"
                          defaultValue={item.title}
                        />
                        <textarea
                          className="form-textarea mt-4"
                          placeholder="Enter Description"
                          defaultValue={item.description}
                        ></textarea>
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-input w-32"
                          placeholder="Quantity"
                          defaultValue={item.quantity}
                          min={0}
                          onChange={(e) =>
                            changeQuantityPrice(
                              "quantity",
                              e.target.value,
                              item.id
                            )
                          }
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-input w-32"
                          placeholder="Price"
                          defaultValue={item.amount}
                          min={0}
                          onChange={(e) =>
                            changeQuantityPrice(
                              "price",
                              e.target.value,
                              item.id
                            )
                          }
                        />
                      </td>
                      <td>${item.quantity * item.amount}</td>
                      <td>
                        <button type="button" onClick={() => removeItem(item)}>
                          <IconX className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 flex flex-col justify-between px-4 sm:flex-row">
            <div className="mb-6 sm:mb-0">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => addItem()}
              >
                Add Item
              </button>
            </div>
            <div className="sm:w-2/5">
              <div className="flex items-center justify-between">
                <div>Subtotal</div>
                <div>$265.00</div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>Tax(%)</div>
                <div>0%</div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>Shipping Rate($)</div>
                <div>$0.00</div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>Discount(%)</div>
                <div>0%</div>
              </div>
              <div className="mt-4 flex items-center justify-between font-semibold">
                <div>Total</div>
                <div>$265.00</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 px-4">
          <label htmlFor="notes">Notes</label>
          <textarea
            id="notes"
            name="notes"
            className="form-textarea min-h-[130px]"
            placeholder="Notes...."
            defaultValue={params.notes}
          ></textarea>
        </div>
      </div>
      <div className="mt-6 w-full xl:mt-0 xl:w-96">
        <div className="panel mb-5">
          <label htmlFor="currency">Currency</label>
          <select
            id="currency"
            name="currency"
            className="form-select"
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
          >
            {currencyList.map((currency, i) => (
              <option value={currency} key={i}>
                {currency}
              </option>
            ))}
          </select>
          <div className="mt-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tax">Tax(%) </label>
                <input
                  id="tax"
                  type="number"
                  name="tax"
                  className="form-input"
                  placeholder="Tax"
                  value={tax}
                  onChange={(e) => setTax(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="discount">Discount(%) </label>
                <input
                  id="discount"
                  type="number"
                  name="discount"
                  className="form-input"
                  placeholder="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="shipping-charge">Shipping Charge($) </label>
            <input
              id="shipping-charge"
              type="number"
              name="shipping-charge"
              className="form-input"
              placeholder="Shipping Charge"
              value={shippingCharge}
              onChange={(e) => setShippingCharge(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="payment-method">Accept Payment Via</label>
            <select
              id="payment-method"
              name="payment-method"
              className="form-select"
              defaultValue={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value=" ">Select Payment</option>
              <option value="bank">Bank Account</option>
              <option value="paypal">Paypal</option>
              <option value="upi">UPI Transfer</option>
            </select>
          </div>
        </div>
        <div className="panel">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-1">
            <button type="button" className="btn btn-success w-full gap-2">
              <IconSave className="shrink-0 ltr:mr-2 rtl:ml-2" />
              Save
            </button>

            <button type="button" className="btn btn-info w-full gap-2">
              <IconSend className="shrink-0 ltr:mr-2 rtl:ml-2" />
              Send Invoice
            </button>

            <Link
              href="/template/apps/invoice/preview"
              className="btn btn-primary w-full gap-2"
            >
              <IconEye className="shrink-0 ltr:mr-2 rtl:ml-2" />
              Preview
            </Link>

            <button type="button" className="btn btn-secondary w-full gap-2">
              <IconDownload className="shrink-0 ltr:mr-2 rtl:ml-2" />
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentsAppsInvoiceEdit;
