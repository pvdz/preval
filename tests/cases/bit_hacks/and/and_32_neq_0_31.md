# Preval test case

# and_32_neq_0_31.md

> Bit hacks > And > And 32 neq 0 31
>
> Not sure what's up

#TODO

## Input

`````js filename=intro
function f(x) {
  const bitSet = x & 32;
  const test = bitSet !== 0;
  if (test) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return 'a';
  } else {
    return 'b';
  }
};
$(f(31));
`````

## Pre Normal

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const bitSet = x & 32;
  const test = bitSet !== 0;
  if (test) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return 'a';
  } else {
    return 'b';
  }
};
$(f(31));
`````

## Normalized

`````js filename=intro
let f = function ($$0) {
  let x = $$0;
  debugger;
  const bitSet = x & 32;
  const test = bitSet !== 0;
  if (test) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return 'a';
  } else {
    return 'b';
  }
};
const tmpCallCallee = $;
const tmpCalleeParam = f(31);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const f = function ($$0) {
  const x = $$0;
  debugger;
  const bitSet = x & 32;
  if (bitSet) {
    const a = $(10);
    const b = $(20);
    $(a, b);
    return 'a';
  } else {
    return 'b';
  }
};
const tmpCalleeParam = f(31);
$(tmpCalleeParam);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'b'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
