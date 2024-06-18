# Preval test case

# more_xor_unused.md

> Bit hacks > Or xor > More xor unused
>
> Replace the pattern of `(x|y)^y` with `(x&(~y))`, where `y` is hopefully a literal we can resolve entirely.

Must find the or-xor pattern before merging ors, I guess. Or handle those smartly.

In this case the xor should be left since there are more bits than used in the or.

## Input

`````js filename=intro
const setAssignable = function (a) {
  const b = a | 16;
  const c = b ^ 48;
  return c;
};
$(setAssignable($(100)));
`````

## Pre Normal


`````js filename=intro
const setAssignable = function ($$0) {
  let a = $$0;
  debugger;
  const b = a | 16;
  const c = b ^ 48;
  return c;
};
$(setAssignable($(100)));
`````

## Normalized


`````js filename=intro
const setAssignable = function ($$0) {
  let a = $$0;
  debugger;
  const b = a | 16;
  const c = b ^ 48;
  return c;
};
const tmpCallCallee = $;
const tmpCallCallee$1 = setAssignable;
const tmpCalleeParam$1 = $(100);
const tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const tmpCalleeParam$1 = $(100);
tmpCalleeParam$1 ** 0;
const tmpOrXor = tmpCalleeParam$1 & -17;
const c = tmpOrXor ^ 32;
$(c);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 100 );
a ** 0;
const b = a & -17;
const c = b ^ 32;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 68
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
