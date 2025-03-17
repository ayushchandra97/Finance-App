"use client"

import {
  ChartType,
  fetchData,
  pieChartData,
  PieChartType,
} from "@/utils/chartdatafetch"
import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export function BarChartComponent() {
  useEffect(() => {
    async function dataFetch() {
      const resData = await fetchData()

      setData(resData as ChartType[])
    }
    dataFetch()
  }, [])

  const [data, setData] = useState<ChartType[]>([])

  if (data.length === 0) {
    return <p>Loading...</p>
  }
  // console.log(data)

  return (
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={300} height={300} data={data} margin={{ left: -20 }}>
          <XAxis
            dataKey="category"
            tick={{ width: 75, fontSize: 9 }}
            interval={0}
          />
          <YAxis tick={{ fontSize: 8 }} />
          <Tooltip />
          <Legend
            payload={[
              { value: "Income", type: "square", color: "#82ca9d" },
              { value: "Expenses", type: "square", color: "#8884d8" },
            ]}
            wrapperStyle={{ paddingTop: 20 }}
          />
          <Bar dataKey="amount">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.type === "Income" ? "#82ca9d" : "#8884d8"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: {
  cx: number
  cy: number
  midAngle: number
  innerRadius: number
  outerRadius: number
  percent: number
}) => {
  if (percent === 0) return null

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={10}
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export function PieChartComponent() {
  useEffect(() => {
    async function dataFetch() {
      const resData = (await pieChartData()) as unknown
      setData(resData as PieChartType[])
    }
    dataFetch()
  }, [])

  const [data, setData] = useState<PieChartType[]>([])

  if (data.length === 0) {
    return <p>Loading...</p>
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="Income"
          nameKey="category"
          cx="50%"
          cy="50%"
          innerRadius={90}
          outerRadius={130}
          fill="#8884d8"
          label={renderCustomizedLabel}
          labelLine={false}
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="Expenses"
          nameKey="category"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function LineChartComponent() {
  useEffect(() => {
    async function dataFetch() {
      const resData = await fetchData()
      setData(resData as ChartType[])
    }
    dataFetch()
  }, [])

  const [data, setData] = useState<ChartType[]>([])
  // console.log(data)

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
        {/* <Line
          type="monotone"
          dataKey="Income"
          stroke="#82ca9d"
          dot={false}
          connectNulls
        />
        <Line
          type="monotone"
          dataKey="Expenses"
          stroke="#8884d8"
          dot={false}
          connectNulls
        /> */}
      </LineChart>
    </ResponsiveContainer>
  )
}
