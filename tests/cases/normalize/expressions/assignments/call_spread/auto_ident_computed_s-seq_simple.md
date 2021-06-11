# Preval test case

# auto_ident_computed_s-seq_simple.md

> Normalize > Expressions > Assignments > Call spread > Auto ident computed s-seq simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...(a = (1, 2, b)[$("c")]));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
$(...(a = (1, 2, b)[$('c')]));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpAssignRhsCompObj = b;
const tmpAssignRhsCompProp = $('c');
a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
let tmpCalleeParamSpread = a;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output

`````js filename=intro
const tmpAssignRhsCompProp = $('c');
const b = { c: 1 };
const a = b[tmpAssignRhsCompProp];
$(...a);
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
