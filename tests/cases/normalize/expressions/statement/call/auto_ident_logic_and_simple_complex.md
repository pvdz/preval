# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Call > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1 && $($(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1 && $($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = 1;
if (tmpCalleeParam) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParam = tmpCallCallee$1(tmpCalleeParam$1);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
let tmpCalleeParam = 1;
if (tmpCalleeParam) {
  const tmpCalleeParam$1 = $(1);
  tmpCalleeParam = $(tmpCalleeParam$1);
}
$(tmpCalleeParam);
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
