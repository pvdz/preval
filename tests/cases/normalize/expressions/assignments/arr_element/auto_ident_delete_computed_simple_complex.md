# Preval test case

# auto_ident_delete_computed_simple_complex.md

> Normalize > Expressions > Assignments > Arr element > Auto ident delete computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$((a = delete arg[$("y")]) + (a = delete arg[$("y")]));
$(a, arg);
`````

## Pre Normal

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$((a = delete arg[$('y')]) + (a = delete arg[$('y')]));
$(a, arg);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $('y');
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpBinBothLhs = a;
const tmpDeleteCompObj$1 = arg;
const tmpDeleteCompProp$1 = $('y');
a = delete tmpDeleteCompObj$1[tmpDeleteCompProp$1];
let tmpBinBothRhs = a;
const tmpCalleeParam = tmpBinBothLhs + tmpBinBothRhs;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output

`````js filename=intro
const arg = { y: 1 };
const tmpDeleteCompProp = $('y');
const a = delete arg[tmpDeleteCompProp];
const tmpDeleteCompProp$1 = $('y');
const tmpSSA_a = delete arg[tmpDeleteCompProp$1];
const tmpCalleeParam = a + tmpSSA_a;
$(tmpCalleeParam);
$(tmpSSA_a, arg);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'y'
 - 2: 'y'
 - 3: 2
 - 4: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
