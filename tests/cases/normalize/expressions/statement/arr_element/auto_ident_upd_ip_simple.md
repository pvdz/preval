# Preval test case

# auto_ident_upd_ip_simple.md

> normalize > expressions > statement > arr_element > auto_ident_upd_ip_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
b++ + b++;
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
const tmpPostUpdArgIdent = b;
b = b + 1;
const tmpBinBothLhs = tmpPostUpdArgIdent;
const tmpPostUpdArgIdent$1 = b;
b = b + 1;
const tmpBinBothRhs = tmpPostUpdArgIdent$1;
tmpBinBothLhs + tmpBinBothRhs;
$(a, b);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(a, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '999', b: '1000' }, 3
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
