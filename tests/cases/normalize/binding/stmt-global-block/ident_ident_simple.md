# Preval test case

# ident_ident_simple.md

> normalize > assignment > stmt > ident_ident_simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
if ($(true)) {
  let b = 2, c = 3;
  let a = b = c;
  $(a, b, c);
}
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
a = b = c;
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
let b = 2;
a = b = 3;
$(a, b, 3);
`````

## Result

Should call `$` with:
 - 0: 3,3,3
 - 1: undefined

Normalized calls: Same

Final output calls: Same
