# Preval test case

# auto_ident_new_prop_simple.md

> Normalize > Expressions > Statement > Arr spread > Auto ident new prop simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
[...new b.$(1)];
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $ };
let a = { a: 999, b: 1000 };
[...new b.$(1)];
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
const tmpArrElToSpread = new tmpNewCallee(1);
[...tmpArrElToSpread];
$(a);
`````

## Output

`````js filename=intro
const b = { $: $ };
const a = { a: 999, b: 1000 };
const tmpNewCallee = b.$;
const tmpArrElToSpread = new tmpNewCallee(1);
[...tmpArrElToSpread];
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - eval returned: ('<crash[ <ref> is not function/iterable ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
