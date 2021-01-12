const text = {
  primary: '#5D7D9A',
  secondary: '#6C6C6C',
}

export default {
  palette: {
    line: [
      //text,  line, node, ?
      ['#FFFFFF', '#04A3F5', '#04A3F5', '#0276e3'],
      ['#FFFFFF', '#98D1EE', '#98D1EE', '#77aee9'],
      ['#FFFFFF', '#295A73', '#295A73', '#295A73'],
      ['#FFFFFF', '#5DD6FC', '#5DD6FC', '#5DD6FC'],
      ['#FFFFFF', '#156EAF', '#156EAF', '#156EAF'],
      ['#FFFFFF', '#45D6C4', '#45D6C4', '#45D6C4'],
    ],
    vbar: [
      ['#FFFFFF', '#04A3F5', '#04A3F5', '#0276e3'],
      ['#FFFFFF', '#98D1EE', '#98D1EE', '#77aee9'],
      ['#FFFFFF', '#295A73', '#295A73', '#295A73'],
      ['#FFFFFF', '#5DD6FC', '#5DD6FC', '#5DD6FC'],
      ['#FFFFFF', '#156EAF', '#156EAF', '#156EAF'],
      ['#FFFFFF', '#45D6C4', '#45D6C4', '#45D6C4'],
    ],
    area: [
      ['#FFFFFF', '#afecfe', '#afecfe', '#0276e3'],
      ['#FFFFFF', '#7ddefd', '#7ddefd', '#77aee9'],
      ['#FFFFFF', '#36b6f8', '#36b6f8', '#295A73'],
      ['#FFFFFF', '#3290be', '#3290be', '#5DD6FC'],
      ['#FFFFFF', '#5ca5ca', '#5ca5ca', '#156EAF'],
      ['#FFFFFF', '#a0bed6', '#a0bed6', '#45D6C4'],
      ['#FFFFFF', '#98c1de', '#98c1de', '#156EAF'],
      ['#FFFFFF', '#aedaf2', '#aedaf2', '#45D6C4'],
    ],
    pie: [
      ['#FFFFFF', '#afecfe', '#afecfe', '#afecfe'],
      ['#FFFFFF', '#7ddefd', '#7ddefd', '#7ddefd'],
      ['#FFFFFF', '#36b6f8', '#36b6f8', '#36b6f8'],
      ['#FFFFFF', '#3290be', '#3290be', '#3290be'],
      ['#FFFFFF', '#5ca5ca', '#5ca5ca', '#5ca5ca'],
      ['#FFFFFF', '#a0bed6', '#a0bed6', '#a0bed6'],
      ['#FFFFFF', '#98c1de', '#98c1de', '#98c1de'],
      ['#FFFFFF', '#aedaf2', '#aedaf2', '#45D6C4'],
    ],
    scatter: [
      ['#FFFFFF', '#afecfe', '#afecfe', '#afecfe'],
      ['#FFFFFF', '#7ddefd', '#7ddefd', '#7ddefd'],
      ['#FFFFFF', '#36b6f8', '#36b6f8', '#36b6f8'],
      ['#FFFFFF', '#3290be', '#3290be', '#3290be'],
      ['#FFFFFF', '#5ca5ca', '#5ca5ca', '#5ca5ca'],
      ['#FFFFFF', '#a0bed6', '#a0bed6', '#a0bed6'],
      ['#FFFFFF', '#98c1de', '#98c1de', '#98c1de'],
      ['#FFFFFF', '#aedaf2', '#aedaf2', '#45D6C4'],
    ],

  },
  graph: {
    title: {
      color: text.primary,
      fontWeight: 600,
      align: 'left',
      fontSize: 20,
    },

    plot: {

    },
    legend: {
      // margin: '100',
      align: 'right', // Cannot set margin and align...,
      verticalAlign: 'top',
      layout: 'horizontal',
      cursor: 'hand',
      // highlightPlot: true,
      item: {
        cursor: 'pointer',
        fontColor: '#373a3c',
        fontSize: '12px'
      },
      marker: {
        type: 'circle'
      },
      toggleAction: 'remove',
      borderRadius: '5px',
      offsetX: -40,
      offsetY: 5,
      header: {
        offsetX: -40,
        offsetY: 5,
        text: 'Legend',
        color: text.primary,
        padding: '10px',
        visible: true, // Cannot force the header to be on.
      }
    },
    scaleX: {
      label: {
        color: text.secondary,
      },
      lineColor: '#D8D8D8',
      tick: {
        lineColor: '#D8D8D8',
      },
      item: {
        color: '#6C6C6C',
      },
    },
    scaleY: {
      label: {
        color: text.secondary,
      },
      lineColor: '#D8D8D8',
      tick: {
        lineColor: '#D8D8D8',
      },
      item: {
        color: '#6C6C6C',
      },
    },
    crosshairX: {
      plotLabel: {
        fontColor: '#333',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: '#EEE',
        padding: 10,
        decimals: 2,
      },
      scaleLabel: {
        fontColor: '#fff',
        backgroundColor: '#5D7D9A',
        borderRadius: 3,
        borderColor: '#EEE',
      }
    },
    tooltip: {
      text: '<span style=\'font-weight:600;font-size:12px\'>%t</span> : <span>%v</span>',
      // text: '<span style="font-color:red">%t:</span> %kv',
      // htmlTooltip:'%t: %kv',
      borderColor: '#FFF',
      shadow: false,
      borderRadius: 3,
      htmlMode: true,
      decimals: 2,
    },
    subtitle: {
      color: text.secondary,
      fontWeight: 300,
    },
    plotarea: {

      margin: '35 50 60 50'
    },

  },


}