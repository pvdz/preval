# Preval test case

# auto_ident_logic_and_complex_simple.md

> normalize > expressions > statement > let > auto_ident_logic_and_complex_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = $($(1)) && 2;
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
let xyz = tmpCallCallee(tmpCalleeParam);
if (xyz) {
  xyz = 2;
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCalleeParam = $(1);
let xyz = $(tmpCalleeParam);
if (xyz) {
  xyz = 2;
}
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same