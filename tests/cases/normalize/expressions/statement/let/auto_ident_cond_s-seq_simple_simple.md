# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > statement > let > auto_ident_cond_s-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = (10, 20, 30) ? $(2) : $($(100));
$(xyz);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  xyz = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  xyz = tmpCallCallee(tmpCalleeParam);
}
$(xyz);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
let xyz = undefined;
if (30) {
  xyz = $(2);
} else {
  const tmpCalleeParam = $(100);
  xyz = $(tmpCalleeParam);
}
$(xyz);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
