# Preval test case

# auto_ident_logic_or_complex_simple.md

> Normalize > Expressions > Statement > Let > Auto ident logic or complex simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || 2;
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(0)) || 2;
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let xyz = tmpCallCallee(tmpCalleeParam);
if (xyz) {
} else {
  xyz = 2;
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
let xyz = $(tmpCalleeParam);
if (xyz) {
} else {
  xyz = 2;
}
$(xyz);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
