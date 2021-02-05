# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > statement > binary_left > auto_ident_cond_s-seq_simple_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
((10, 20, 30) ? $(2) : $($(100))) + $(100);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
10;
20;
const tmpIfTest = 30;
if (tmpIfTest) {
  $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCallCallee(tmpCalleeParam);
}
$(100);
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
$(2);
$(100);
$(a);
`````

## Result

Should call `$` with:
 - 1: 2
 - 2: 100
 - 3: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
