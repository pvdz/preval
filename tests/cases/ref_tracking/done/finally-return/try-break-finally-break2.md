# Preval test case

# try-break-finally-break2.md

> Ref tracking > Done > Finally-return > Try-break-finally-break2
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
          x = 6; // overwrites 3 4 5
          break b;
        }
      }
      $(x); // 3 5
    }
    $(x); // 3 5 6
  }
  $(x); // 3 4 5 6
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
      }
    }
    $(x___54__);
  }
  $(x___58__);
}
$(x___62__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 62          | none           | none
  - w @12      | ########## | 58          | none           | none
  - w @19      | ########## | 54          | none           | none
  - w @28      | ########## | not read    | none           | none
  - w @35      | ########## | not read    | none           | none
  - r @40      | none (TDZ?)
  - w @47      | ########## | not read    | none           | none
  - r @54      | 19
  - r @58      | 12
  - r @62      | 4
