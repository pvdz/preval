# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident logic or simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = 0 || 2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(a = 0 || 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = 0;
if (a) {
} else {
  a = 2;
}
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
let SSA_a = 0;
if (SSA_a) {
} else {
  SSA_a = 2;
}
const tmpCalleeParamSpread = SSA_a;
$(...tmpCalleeParamSpread);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
