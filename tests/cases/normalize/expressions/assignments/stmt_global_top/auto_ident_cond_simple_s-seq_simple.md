# Preval test case

# auto_ident_cond_simple_s-seq_simple.md

> normalize > expressions > assignments > stmt_global_top > auto_ident_cond_simple_s-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 1 ? (40, 50, 60) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
if (1) {
  40;
  50;
  a = 60;
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
a = 60;
$(a);
`````

## Result

Should call `$` with:
 - 1: 60
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
