# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > Let > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 0 || $($(1));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = 0;
if (xyz) {
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  xyz = tmpCallCallee(tmpCalleeParam);
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let xyz = 0;
if (xyz) {
} else {
  const tmpCalleeParam = $(1);
  xyz = $(tmpCalleeParam);
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

Normalized calls: Same

Final output calls: Same
