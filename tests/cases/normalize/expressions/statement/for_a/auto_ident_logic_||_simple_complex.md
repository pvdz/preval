# Preval test case

# auto_ident_logic_||_simple_complex.md

> Normalize > Expressions > Statement > For a > Auto ident logic || simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (0 || $($(1)); $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  0 || $($(1));
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
tmpCallCallee(tmpCalleeParam);
let tmpIfTest = $(0);
while (tmpIfTest) {
  tmpIfTest = $(0);
}
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = $(1);
$(tmpCalleeParam);
let tmpIfTest = $(0);
while (tmpIfTest) {
  tmpIfTest = $(0);
}
const a = { a: 999, b: 1000 };
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 0
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
