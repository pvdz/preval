# Preval test case

# auto_ident_logic_||_simple_complex.md

> normalize > expressions > statement > call > auto_ident_logic_||_simple_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(0 || $($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = 0;
if (tmpCalleeParam) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpCalleeParam = 0;
if (tmpCalleeParam) {
} else {
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParam = $(tmpCalleeParam$1);
}
$(tmpCalleeParam);
$(a);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same