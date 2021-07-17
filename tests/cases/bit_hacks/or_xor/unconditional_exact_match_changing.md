# Preval test case

# unconditional_exact_match_changing.md

> Bit hacks > Or xor > Unconditional exact match changing
>
> Replace the pattern of `(x|y)^y` with `(x&(~y))`, where `y` is hopefully a literal we can resolve entirely.

Must find the or-xor pattern before merging ors, I guess. Or handle those smartly.

#TODO

## Input

`````js filename=intro
const setAssignable = function (a) {
  const b = a | 16;
  const c = b ^ 16;
  return c;
};
$(setAssignable($(100 | 16)));
`````

## Pre Normal

`````js filename=intro
const setAssignable = function ($$0) {
  let a = $$0;
  debugger;
  const b = a | 16;
  const c = b ^ 16;
  return c;
};
$(setAssignable($(100 | 16)));
`````

## Normalized

`````js filename=intro
const setAssignable = function ($$0) {
  let a = $$0;
  debugger;
  const b = a | 16;
  const c = b ^ 16;
  return c;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = setAssignable;
const tmpCallCallee$3 = $;
const tmpCalleeParam$3 = 116;
const tmpCalleeParam$1 = tmpCallCallee$3(tmpCalleeParam$3);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(116);
tmpCalleeParam$1 ** 0;
const c = tmpCalleeParam$1 & -17;
$(c);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 116
 - 2: 100
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same