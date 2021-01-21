# Preval test case

# ident_sequence_complex.md

> normalize > assignment > if > ident_sequence_complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
if (a = ($(b), $(c))) ;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
$(b);
a = $(c);
$(a, b, c);
`````

## Output

`````js filename=intro
let a = 1;
$(2);
a = $(3);
$(a, 2, 3);
`````

## Result

Should call `$` with:
 - 0: 2
 - 1: 3
 - 2: null,2,3
 - 3: undefined

Normalized calls: Same

Final output calls: Same
