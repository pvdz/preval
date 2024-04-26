# Preval test case

# break-finally-cond.md

> Ref tracking > Done > Finally-return > Break-finally-cond

## Options

- refTest

## Input

`````js filename=intro
{
  let x = 1;
  here: {
    try {
      if ($()) {
        x = 2;
        break here;
      }
      x = 3;
    } finally {
      $(x); // 1 or 2
    }

    $(x); // 3 
    x = 4;
  }
  
  $(x); // 2 or 4
}
`````

## Output

(Annotated with pids)

`````filename=intro
let x___4__ = 1;
here___7__: /*8*/ {
  try /*10*/ {
    const tmpIfTest___13__ = $();
    if (tmpIfTest___17__) {
      /*18*/ x___22__ = 2;
      break here___24__;
    } /*25*/ else {
      x___29__ = 3;
    }
  } finally /*30*/ {
    $(x___34__);
  }
  $(x___38__);
  x___42__ = 4;
}
$(x___46__);
`````

Ref tracking result:

               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 46          | none           | none
  - w @22      | ########## | not read    | none           | none
  - w @29      | ########## | not read    | none           | none
  - r @34      | none (TDZ?)
  - r @38      | none (TDZ?)
  - w @42      | ########## | not read    | none           | none
  - r @46      | 4

tmpIfTest:
  - w @13      | ########## | 17          | none           | none
  - r @17      | 13
