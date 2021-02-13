# Preval test case

# auto_ident_logic_or_simple_simple.md

> normalize > expressions > assignments > call_spread > auto_ident_logic_or_simple_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

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
let a = { a: 999, b: 1000 };
a = 0;
if (a) {
} else {
  a = 2;
}
let tmpCalleeParamSpread = a;
$(...tmpCalleeParamSpread);
$(a);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same