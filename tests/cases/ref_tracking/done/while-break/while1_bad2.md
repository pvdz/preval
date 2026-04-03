# Preval test case

# while1_bad2.md

> Ref tracking > Done > While-break > While1 bad2
>
> Regression

## Options

- refTest

## Input

`````js filename=intro
let x = 1;
while (true) {
  if ($(0)) {
    A: {
      $(x);
      const test = 0; // Note: ref tracking comes before first pass of value tracking
      if (test) {
        x = 2;
        break A;
      } else {
      }
    }
    $(x);
  } else {
    break;
  }
}
$(x); // x=1 2
`````


## Output

(Annotated with pids)

`````filename=intro
/* stmt(3): */ let /*___4__*/ x = 1;
/* stmt(6): */ while (true) {
  /*8~44*/ /* stmt(10): */ const /*___11__*/ tmpIfTest = $(0);
  /* stmt(15): */ if (/*___16__*/ tmpIfTest) {
    /*17~42*/ /* stmt(18): */ /*___19__*/ A: /*20~38*/ {
      /* stmt(22): */ $(/*___25__*/ x);
      /* stmt(26): */ const /*___27__*/ test = 0;
      /* stmt(29): */ if (/*___30__*/ test) {
        /*31~37*/ /* stmt(32): */ /*___35__*/ x = 2;
        /* stmt(36): */ break /*___37__*/ A;
      } /*38~38*/ else {
      }
    }
    /* stmt(39): */ $(/*___42__*/ x);
  } /*43~44*/ else {
    /* stmt(44): */ break;
  }
}
/* stmt(45): */ $(/*___48__*/ x);
`````


## Todos triggered


None


## Ref tracking result


               | reads      | read by     | overWrites     | overwritten by
x:
  - w @4       | ########## | 25,42,48    | none           | 35
  - r @25      | 4,35
  - w @35      | ########## | 25,42,48    | 4,35           | 35
  - r @42      | 4,35
  - r @48      | 4,35

tmpIfTest:
  - w @11      | ########## | 16          | none           | none
  - r @16      | 11

test:
  - w @27      | ########## | 30          | none           | none
  - r @30      | 27
