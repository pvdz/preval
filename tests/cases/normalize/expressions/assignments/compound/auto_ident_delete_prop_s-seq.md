# Preval test case

# auto_ident_delete_prop_s-seq.md

> normalize > expressions > assignments > compound > auto_ident_delete_prop_s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a *= delete ($(1), $(2), arg).y));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpBinBothLhs = a;
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpBinBothRhs = delete tmpDeleteObj.y;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = a;
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpBinBothRhs = delete tmpDeleteObj.y;
a = tmpBinBothLhs * tmpBinBothRhs;
let tmpCalleeParam = a;
$(tmpCalleeParam);
$(a, arg);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: NaN
 - 4: NaN, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
