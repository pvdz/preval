# Preval test case

# auto_ident_new_computed_s-seq_complex.md

> normalize > expressions > bindings > switch_case > auto_ident_new_computed_s-seq_complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
switch (1) {
  case 1:
    let b = { $ };

    let a = new (1, 2, b)[$("$")](1);
    $(a);
}
`````

## Normalized

`````js filename=intro
{
  let b;
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
        b = { $: $ };
        1;
        2;
        const tmpCompObj = b;
        const tmpCompProp = $('$');
        const tmpNewCallee = tmpCompObj[tmpCompProp];
        a = new tmpNewCallee(1);
        $(a);
      }
      tmpFallthrough = true;
    }
  }
}
`````

## Output

`````js filename=intro
let b;
let a;
let tmpFallthrough = false;
let tmpIfTest = tmpFallthrough;
if (tmpIfTest) {
} else {
  tmpIfTest = true;
}
if (tmpIfTest) {
  b = { $: $ };
  const tmpCompObj = b;
  const tmpCompProp = $('$');
  const tmpNewCallee = tmpCompObj[tmpCompProp];
  a = new tmpNewCallee(1);
  $(a);
  tmpFallthrough = true;
}
`````

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - 3: {}
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
