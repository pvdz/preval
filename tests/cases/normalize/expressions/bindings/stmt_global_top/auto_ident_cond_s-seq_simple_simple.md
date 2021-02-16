# Preval test case

# auto_ident_cond_s-seq_simple_simple.md

> normalize > expressions > bindings > stmt_global_top > auto_ident_cond_s-seq_simple_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = (10, 20, 30) ? $(2) : $($(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = undefined;
const tmpIfTest = 30;
if (tmpIfTest) {
  a = $(2);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  a = tmpCallCallee(tmpCalleeParam);
}
$(a);
`````

## Output

`````js filename=intro
let a = undefined;
a = $(2);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
