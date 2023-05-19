import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import axios from 'axios'
import { useSelector } from 'react-redux'

const PieChartWithCenteredLabels = ({jobCard, workOrder, stockEntry, billOfMaterials}) => {


 
    const data = [
        {
            key: 1,
            label:"Job Card",
            amount: jobCard,
            svg: { fill: '#BE5A83' },
        },
        {
            key: 2,
            label:"Work Order",
            amount: workOrder,
            svg: { fill: '#E06469' }
        },
        {
            key: 3,
            label:"Stock Entry",
            amount: stockEntry,
            svg: { fill: '#F2B6A0' }
        },
        {
            key: 4,
            label:"Bill Of Materials",
            amount: billOfMaterials,
            svg: { fill: '#DEDEA7' }
        }
    ]
    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'#656565'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={24}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {data.amount}
                    
                </Text>
            )
        })
    }


  return (
    <PieChart
    style={{ height: 200, marginRight: 5 }}
    valueAccessor={({ item }) => item.amount}
    data={data}
    spacing={0}
    outerRadius={'95%'}
>
    <Labels/>
</PieChart>
  )
}

export default PieChartWithCenteredLabels