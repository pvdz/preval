# Preval test case

# ident_sequence_complex_complex.md

> Normalize > Binding > For-a > Ident sequence complex complex
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let a = 1, b = 2, c = 3;
for (let a = ($(b), $(c)).x = $(c);false;) $(a, b, c);
`````

## Normalized

`````js filename=intro
let a = 1;
let b = 2;
let c = 3;
$(b);
const varInitAssignLhsComputedObj = $(c);
const varInitAssignLhsComputedRhs = $(c);
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
let a$1 = varInitAssignLhsComputedRhs;
`````

## Output

`````js filename=intro
$(2);
const varInitAssignLhsComputedObj = $(3);
const varInitAssignLhsComputedRhs = $(3);
varInitAssignLhsComputedObj.x = varInitAssignLhsComputedRhs;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 2
 - 2: 3
 - 3: 3
 - eval returned: ("<crash[ Cannot create property 'x' on number '3' ]>")

Normalized calls: Same

Final output calls: Same
