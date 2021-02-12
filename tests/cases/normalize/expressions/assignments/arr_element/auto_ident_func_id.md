# Preval test case

# auto_ident_func_id.md

> normalize > expressions > assignments > arr_element > auto_ident_func_id
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = function f() {}) + (a = function f() {}));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = function f() {};
let tmpBinBothLhs = a;
a = function f_1() {};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = function f() {};
let tmpBinBothLhs = a;
a = function f_1() {};
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 'function() {}function() {}'
 - 2: 'function'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
