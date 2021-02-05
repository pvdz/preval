# Preval test case

# auto_ident_prop_s-seq_assign_simple.md

> normalize > expressions > statement > call_spread > auto_ident_prop_s-seq_assign_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
$(...((1, 2, b).c = 2));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
1;
2;
const tmpNestedAssignObj = b;
const tmpNestedPropAssignRhs = 2;
tmpNestedAssignObj.c = tmpNestedPropAssignRhs;
tmpCalleeParamSpread = tmpNestedPropAssignRhs;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParamSpread;
const tmpNestedAssignObj = b;
tmpNestedAssignObj.c = 2;
tmpCalleeParamSpread = 2;
tmpCallCallee(...tmpCalleeParamSpread);
$(a, b);
`````

## Result

Should call `$` with:
 - eval returned: ('<crash[ Found non-callable @@iterator ]>')

Normalized calls: Same

Final output calls: Same
