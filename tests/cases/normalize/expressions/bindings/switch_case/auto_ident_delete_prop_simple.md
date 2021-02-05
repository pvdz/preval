# Preval test case

# auto_ident_delete_prop_simple.md

> normalize > expressions > bindings > switch_case > auto_ident_delete_prop_simple
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let x = { y: 1 };

    let a = delete x.y;
    $(a, x);
}
`````

## Normalized

`````js filename=intro
{
  let x;
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
        x = { y: 1 };
        a = delete x.y;
        $(a, x);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let x;
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  x = { y: 1 };
  a = delete x.y;
  $(a, x);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: true, {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
