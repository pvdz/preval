# Preval test case

# try-break-finally-break.md

> Ref tracking > Done > Finally-return > Try-break-finally-break
> Trying to come up with a case where abrupt flow distortion matters

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  a: {
    x = 2;
    b: {
      x = 3;
      try {
        if ($) {
          x = 4;
          break a;
        }
        x = 5;
      } finally {
        $(x); // 3 4 5
        if ($) {
          x = 6;
          break b;
        }
        x = 7;
      }
      $(x); // 7
    }
    $(x); // 6 7
  }
  $(x); // 6 7
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
a___7__: /*8*/ {
  x___12__ = 2;
  b___14__: /*15*/ {
    x___19__ = 3;
    try /*21*/ {
      if ($) {
        /*24*/ x___28__ = 4;
        break a___30__;
      } /*31*/ else {
        x___35__ = 5;
      }
    } finally /*36*/ {
      $(x___40__);
      if ($) {
        /*43*/ x___47__ = 6;
        break b___49__;
      } /*50*/ else {
        x___54__ = 7;
      }
    }
    $(x___58__);
  }
  $(x___62__);
}
$(x___66__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 66          | none           | none
  - w @12      | ########## | 62          | none           | none
  - w @19      | ########## | 58          | none           | none
  - w @28      | ########## | not read    | none           | none
  - w @35      | ########## | not read    | none           | none
  - r @40      | none (TDZ?)
  - w @47      | ########## | not read    | none           | none
  - w @54      | ########## | not read    | none           | none
  - r @58      | 19
  - r @62      | 12
  - r @66      | 4
