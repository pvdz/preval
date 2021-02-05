# Preval test case

# auto_ident_array_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_array_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let a = [1, 2, 3];
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let a;
  {
    let tmpFallthrough = false;
    let tmpIfTest = tmpFallthrough;
    if (tmpIfTest) {
    } else {
      tmpIfTest = 1 === 1;
    }
    if (tmpIfTest) {
      ('case 0:');
      {
        a = [1, 2, 3];
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  a = [1, 2, 3];
  $(a);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: [1, 2, 3]
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
