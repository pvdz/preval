# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > Logic and right > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && (0 || $($(1)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$(100) && (0 || $($(1)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest = $(100);
if (tmpIfTest) {
  const tmpCalleeParam = $(1);
  $(tmpCalleeParam);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
