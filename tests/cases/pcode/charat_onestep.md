# Preval test case

# charat_onestep.md

> Pcode > Charat onestep

## Options

- pcode

## Input

`````js filename=intro
const rngstr = function() {
  const rand = Math.random();
  const mul = rand * 62;
  const flr = Math.floor(mul);
  const chrt = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(flr);
  const cors = $coerce(chrt, `plustr`);
  return cors;
};
$(rngstr());
`````


## Pcode output


`````fileintro

`````




## Todos triggered


None


## Pcode result
