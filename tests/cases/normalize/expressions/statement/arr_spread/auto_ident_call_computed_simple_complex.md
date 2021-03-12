# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Arr spread > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
[...b[$("$")](1)];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
[...b[$('$')](1)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $('$');
const tmpArrElToSpread = tmpCallCompObj[tmpCallCompProp](1);
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpCallCompProp = $('$');
const tmpArrElToSpread = b[tmpCallCompProp](1);
[...tmpArrElToSpread];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
