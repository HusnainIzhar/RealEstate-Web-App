import React, { useEffect, useRef, FC, useState } from "react";
import { Chart } from 'chart.js/auto';
import { IUser, IListing } from "../../types/types";

type Props = {
  user: IUser
};

const Dashboard: FC<Props> = ({ user }) => {
  const piRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<HTMLCanvasElement>(null);
  const [monthlyViews, setMonthlyViews] = useState<number[]>([]);

  useEffect(() => {
    const organizeListingsByMonth = (listings: IListing[]) => {
      const monthlyViews: { [key: string]: number[] } = {};
      listings.forEach((listing) => {
        const createdAt = new Date(listing.createdAt);
        const monthYear = `${createdAt.toLocaleString('default', {
          month: 'short',
        })} ${createdAt.getFullYear()}`;
        if (!monthlyViews[monthYear]) {
          monthlyViews[monthYear] = [];
        }
        monthlyViews[monthYear].push(listing.analytics.views);
      });
      return monthlyViews;
    };

    const monthlyViews = organizeListingsByMonth(user.listings);

    const monthLabels = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const monthlyTotals: number[] = monthLabels.map((label) => {
      const monthYear = `${label} ${new Date().getFullYear()}`;
      return monthlyViews[monthYear] ? monthlyViews[monthYear].reduce((acc, curr) => acc + curr, 0) : 0;
    });
    setMonthlyViews(monthlyTotals)
  }, []);


  const totalRented = user.listings.filter((listing) => listing.purpose === "rent").length;

  const totalSale = user.listings.filter((listing) => listing.purpose === "sale").length;

  useEffect(() => {
    const ctx = piRef.current;
    if (ctx) {
      Chart.getChart(ctx)?.destroy();
      new Chart(ctx, {
        type: 'doughnut',

        data: {
          datasets: [{
            data: [totalSale, totalRented],
            backgroundColor: [
              '#FFC94A',
              '#86469C'
            ],
            hoverOffset: 4
          }]
        },
        options: {
          aspectRatio: 1,
          cutout: 80,
        }
      });
    }
  }, [totalSale, totalRented]);

  useEffect(() => {
    const ctx = chartRef.current;
    if (ctx) {
      Chart.getChart(ctx)?.destroy();
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
            label: 'Views',
            data: monthlyViews,
            fill: true,
            borderColor: '#86469C',
            tension: 0.1
          }]
        }
      });
    }
  }, [monthlyViews]);

  return (
    <>
      <div className="p-5  bg-white rounded-md flex gap-5 flex-wrap overflow-hidden">
        <div className="flex-1 w-full flex-col flex gap-2 justify-center items-center">
          <p className="font-medium text-xl text-left">Properties Listed</p>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#86469C]"></div>For Sale</div>
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FFC94A]"></div>For Rent</div>
        </div>
        <div className="flex-1 h-full w-full flex justify-center items-center">
          <div className="chart-container" style={{ position: 'relative', width: '300px', height: '300px' }}>
            <canvas ref={piRef}></canvas>
            <div className=" absolute text-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <p className="font-medium text-xl">{totalRented + totalSale}</p>
              <p className="text-sm">Listed Properties</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-48 xxs:mt-5 bg-white shadow rounded-md  text-center font-medium text-xl p-5">
        Total Impressions
        <canvas ref={chartRef}></canvas>
      </div>
    </>
  );
};

export default Dashboard;
