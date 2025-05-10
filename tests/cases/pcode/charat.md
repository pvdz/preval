# Preval test case

# charat.md

> Pcode > Charat

## Options

- pcode

## Input

`````js filename=intro
const rngstr = function() {
  const tmpBinBothLhs$7 = Math.random();
  const tmpCalleeParam$5 = tmpBinBothLhs$7 * 62;
  const tmpCalleeParam$6 = Math.floor(tmpCalleeParam$5);
  const tmpBinBothRhs$3 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$6);
  const tmpClusterSSA_o$13 = $coerce(tmpBinBothRhs$3, `plustr`);
  const tmpBinBothLhs$3 = Math.random();
  const tmpCalleeParam$1 = tmpBinBothLhs$3 * 62;
  const tmpCalleeParam$3 = Math.floor(tmpCalleeParam$1);
  const tmpBinBothRhs$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$3);
  const tmpClusterSSA_o$1 = tmpClusterSSA_o$13 + tmpBinBothRhs$1;
  const tmpBinBothLhs$4 = Math.random();
  const tmpCalleeParam$2 = tmpBinBothLhs$4 * 62;
  const tmpCalleeParam$4 = Math.floor(tmpCalleeParam$2);
  const tmpBinBothRhs$2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$4);
  const tmpClusterSSA_o$2 = tmpClusterSSA_o$1 + tmpBinBothRhs$2;
  const tmpBinBothLhs$5 = Math.random();
  const tmpCalleeParam$7 = tmpBinBothLhs$5 * 62;
  const tmpCalleeParam$9 = Math.floor(tmpCalleeParam$7);
  const tmpBinBothRhs$4 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$9);
  const tmpClusterSSA_o$3 = tmpClusterSSA_o$2 + tmpBinBothRhs$4;
  const tmpBinBothLhs$6 = Math.random();
  const tmpCalleeParam$8 = tmpBinBothLhs$6 * 62;
  const tmpCalleeParam$10 = Math.floor(tmpCalleeParam$8);
  const tmpBinBothRhs$5 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$10);
  const tmpClusterSSA_o$7 = tmpClusterSSA_o$3 + tmpBinBothRhs$5;
  const tmpBinBothLhs$8 = Math.random();
  const tmpCalleeParam$11 = tmpBinBothLhs$8 * 62;
  const tmpCalleeParam$13 = Math.floor(tmpCalleeParam$11);
  const tmpBinBothRhs$6 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$13);
  const tmpClusterSSA_o$8 = tmpClusterSSA_o$7 + tmpBinBothRhs$6;
  return tmpClusterSSA_o$8;
};
$(rngstr());
$(rngstr());
$(rngstr());
$(rngstr());
$(rngstr());
$(rngstr());
`````


## Pcode output


`````fileintro

`````




## Todos triggered


None


## Pcode result
