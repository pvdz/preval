# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Let > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 1 && $($(1));
$(xyz);
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 1 && $($(1));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 1;
if (xyz) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  xyz = tmpCallCallee(tmpCalleeParam);
} else {
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let xyz = 1;
if (xyz) {
  const tmpCalleeParam = $(1);
  xyz = $(tmpCalleeParam);
} else {
}
$(xyz);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
