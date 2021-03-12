# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Call spread > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(1 && 2));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(...(1 && 2));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread = 1;
if (tmpCalleeParamSpread) {
  tmpCalleeParamSpread = 2;
}
tmpCallCallee(...tmpCalleeParamSpread);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpCalleeParamSpread = 1;
if (tmpCalleeParamSpread) {
  tmpCalleeParamSpread = 2;
}
$(...tmpCalleeParamSpread);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
