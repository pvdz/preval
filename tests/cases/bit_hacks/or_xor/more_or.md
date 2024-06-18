# Preval test case

# more_or.md

> Bit hacks > Or xor > More or
>
> Replace the pattern of `(x|y)^y` with `(x&(~y))`, where `y` is hopefully a literal we can resolve entirely.

Must find the or-xor pattern before merging ors, I guess. Or handle those smartly.

In this case the or should be left since there are more bits than used in the xor.

## Input

`````js filename=intro
const setAssignable = function (a) {
  const b = a | 48;
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
  const b = a | 48;
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
  const b = a | 48;
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
const b = tmpCalleeParam$1 | 32;
const c = b & -17;
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 116 );
const b = a | 32;
const c = b & -17;
$( c );
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
