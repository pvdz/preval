# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> Normalize > Expressions > Statement > If > Auto ident cond s-seq simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((10, 20, 30) ? $(2) : $($(100)));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
if ((10, 20, 30) ? $(2) : $($(100)));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let tmpIfTest = undefined;
const tmpIfTest$1 = 30;
if (tmpIfTest$1) {
  tmpIfTest = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpIfTest = tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
$(2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
